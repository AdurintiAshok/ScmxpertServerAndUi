package com.exafluence.scmxpert.Controller;
import java.io.IOException;
import java.util.Optional;

import com.exafluence.scmxpert.Respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.exafluence.scmxpert.Model.LoginModel;
import com.exafluence.scmxpert.Model.RegistrationModel;
import com.exafluence.scmxpert.Respository.RegistrationRepo;
import com.exafluence.scmxpert.Service.AppToken;
import com.exafluence.scmxpert.Service.LoginService;
import com.exafluence.scmxpert.Service.TokenService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletResponse;
@RestController
public class AuthController {
    @Autowired
    RegistrationRepo poster;
    @Autowired
    private LoginService loginService;
    @Autowired
    private RegistrationRepo userDataRetreiver;
    @Autowired
    private UserRepository loginRepo;
    @Autowired
    private TokenService service;

    @Hidden
    @RequestMapping(value = "/")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui/index.html");
    }

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<Object> postData(@RequestBody RegistrationModel post) {
        try {
            RegistrationModel existingPost = poster.findByUserEmail(post.getUserEmail());
            if (existingPost != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already exists. Please provide a different email.");
            }
            // Save the post if the email doesn't exist
            poster.save(post);
            return ResponseEntity.ok().body("User Registered Successfully");
        	
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return new ResponseEntity<>("An error occurred while processing the request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginModel loginModelRequest) {
    
        boolean isAuthenticated = loginService.authenticate(loginModelRequest.getuserEmail(), loginModelRequest.getUserPassword());

        if (isAuthenticated) {
            LoginModel user = loginRepo.findByUserEmail(loginModelRequest.getuserEmail());
        	Optional<String> name= service.encrypt(user);
            return ResponseEntity.ok().body(name);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    public Boolean TestToken(String authHeader){
        boolean status=service.decrypt(authHeader);
        return  status;
    }
    @CrossOrigin
    @GetMapping("/profile")
    public boolean ProfileData(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            boolean status = TestToken(token);
            return status;
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No bearer token found in the request header").hasBody();
        }
       
    }


}
