package com.exafluence.scmxpert.Controller;
import java.io.IOException;

import com.exafluence.scmxpert.Respository.RegistrationRepo;
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
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;


@RestController
public class AuthController {

    @Autowired
    RegistrationRepo poster;
    @Value("${application.swagger.url}")
    private String swaggerUrl;
    @Autowired
    private LoginService loginService;
    @Autowired
    private RegistrationRepo userDataRetreiver;
    @Autowired
    private UserRepository loginRepo;
    @Autowired
    private TokenService service;
    public  String userName;
    @Autowired
    private TokenBlacklistService tokenBlacklistService;
    @Hidden
    @RequestMapping(value = "/")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect(swaggerUrl);
    }

    @CrossOrigin
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

            RegistrationModel existingPost = poster.findByUserEmail(post.getUserEmail());
            if (existingPost != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already exists. Please provide a different email.");
            }

            poster.save(post);
            return ResponseEntity.ok().body("User Registered Successfully");

        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("An error occurred while processing the request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @CrossOrigin
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
                LoginModel user = loginRepo.findByUserEmail(loginModelRequest.getuserEmail());
                String name = service.encrypt(user);
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
            return service.decrypt(authHeader);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @CrossOrigin
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
    @CrossOrigin
    @PostMapping("/logout")
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
