package com.exafluence.scmxpert.Controller;
import java.io.IOException;
import java.util.List;

import com.exafluence.scmxpert.Model.NewShipMent;
import com.exafluence.scmxpert.Model.UserData;
import com.exafluence.scmxpert.Respository.RegistrationRepo;
import com.exafluence.scmxpert.Respository.UserRepo;
import com.exafluence.scmxpert.Respository.UserRepository;
import com.exafluence.scmxpert.Service.TokenBlacklistService;
import com.exafluence.scmxpert.Service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.exafluence.scmxpert.Model.LoginModel;
import com.exafluence.scmxpert.Model.RegistrationModel;
import com.exafluence.scmxpert.Service.LoginService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
@RestController
public class AuthController {

    @Autowired
    RegistrationRepo registrationRepo;
    @Value("${application.swagger.url}")
    private String swaggerUrl;
    @Autowired
    private LoginService loginService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @Hidden
    @RequestMapping(value = "/")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect(swaggerUrl);
    }

    @CrossOrigin({"*"})
    @PostMapping("/register")
    public ResponseEntity<?> postData(@RequestBody RegistrationModel post) {
        try {
            if (post.getUserName() == null || post.getUserName().isEmpty()) {
                return ResponseEntity.badRequest().body("Username is required");
            }
            if (post.getUserEmail() == null || post.getUserEmail().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            if (post.getRole() == null || post.getRole().isEmpty()) {
                return ResponseEntity.badRequest().body("Role is required");
            }
            if (post.getUserPassword() == null || post.getUserPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("Password is required");
            }
            RegistrationModel existingPost = registrationRepo.findByUserEmail(post.getUserEmail());
            if (existingPost != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already exists. Please provide a different email.");
            }
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encryptedPassword = passwordEncoder.encode(post.getUserPassword());
            post.setUserPassword(encryptedPassword);
            UserData userData=new UserData();
            userData.setUserEmail(post.getUserEmail());
            userData.setRole(post.getRole());
            userData.setUserName(post.getUserName());
            registrationRepo.save(post);
            userRepo.save(userData);
            return ResponseEntity.ok().body("User Registered Successfully");

        }catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to register user. This email is already in use.");
        }

        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @CrossOrigin({"*"})
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginModel loginModelRequest) {
        try {
            if (loginModelRequest.getuserEmail() == null || loginModelRequest.getuserEmail().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            if (loginModelRequest.getUserPassword() == null || loginModelRequest.getUserPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("Password is required");
            }
            boolean isAuthenticated = loginService.authenticate(loginModelRequest.getuserEmail(), loginModelRequest.getUserPassword());
            if (isAuthenticated) {
                LoginModel user = userRepository.findByUserEmail(loginModelRequest.getuserEmail());
                String name = tokenService.encrypt(user);
                return ResponseEntity.ok().body(name);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        }
        catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable To Access Data From Database");
        }
        catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    public boolean TestToken(String authHeader) {
        try {
            return tokenService.decrypt(authHeader);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public String getUserEmailFromResponse(ResponseEntity<?> userData) {
        if (userData.getBody() instanceof LoginModel) {
            LoginModel loginModel = (LoginModel) userData.getBody();
            return loginModel.getuserEmail();
        } else {
            throw new IllegalArgumentException("Response body is not of type LoginModel");
        }
    }

    @CrossOrigin({"*"})
    @GetMapping("/getUserByEmail")
    public ResponseEntity<Object> getUsers(@RequestHeader("Authorization") String token) {
        if (isValidToken(token) && !tokenBlacklistService.isBlacklisted(token) ) {

            if (token != null && token.startsWith("Bearer ")) {
                String tokenset = token.substring(7);
                ResponseEntity<?> userData = tokenService.loadUserDataFromToken(tokenset);
                String userEmail = getUserEmailFromResponse(userData);
                try {
                    UserData userDataWithEmail = userRepo.findByUserEmail(userEmail);
                    return ResponseEntity.status(HttpStatus.OK).body(userDataWithEmail);
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create shipment.");
                }
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token.");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or Expired Token.");
        }
    }

    private boolean isValidToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            try {
                String tokenValue = token.substring(7);
                return tokenService.decrypt(tokenValue);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }
    @CrossOrigin({"*"})
    @GetMapping("/validate-token")
    public boolean ProfileData(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            try {
                return TestToken(token);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No bearer token found in the request header").hasBody();
        }

    }
    @CrossOrigin({"*"})
    @PostMapping("/logoutFromApplication")
    public ResponseEntity<Object> logout(@RequestHeader("Authorization") String token) {
        try {
            if (token != null && token.startsWith("Bearer ")) {
                String tokenString = token.substring(7);
                boolean status = TestToken(tokenString);
                if (status && !tokenBlacklistService.isBlacklisted(token)) {
                    tokenBlacklistService.addToBlacklist(token);
                    return ResponseEntity.ok().body("User Logged Out Successfully");
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token or Expired Token");

                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No bearer token found in the request header");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
}

}
