package com.exafluence.scmxpert.Controller;

import com.exafluence.scmxpert.Model.LoginModel;
import com.exafluence.scmxpert.Model.RegistrationModel;
import com.exafluence.scmxpert.Respository.RegistrationRepo;
import com.exafluence.scmxpert.Service.LoginService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class AuthController {
    @Autowired
    RegistrationRepo poster;
    @Autowired
    private LoginService loginService;
    @Autowired
    private RegistrationRepo userDataRetreiver;

    @Hidden
    @RequestMapping(value = "/")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui/index.html");
    }

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<Object> postData(@RequestBody RegistrationModel post) {
        try {
            RegistrationModel existingPost = poster.findByEmail(post.getEmail());
            if (existingPost != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already exists. Please provide a different email.");
            }
            // Save the post if the email doesn't exist
            poster.save(post);
            return new ResponseEntity<>(post, HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            // Handle data integrity violation exception
            return new ResponseEntity<>("An error occurred while processing the request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginModel loginModelRequest) {
        boolean isAuthenticated = loginService.authenticate(loginModelRequest.getEmail(), loginModelRequest.getPassword());

        if (isAuthenticated) {
            RegistrationModel user = userDataRetreiver.findByEmail(loginModelRequest.getEmail());
            return ResponseEntity.ok().body(user.getUsername());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

}
