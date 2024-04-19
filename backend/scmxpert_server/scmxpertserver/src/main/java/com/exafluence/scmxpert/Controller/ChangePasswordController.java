package com.exafluence.scmxpert.Controller;

import com.exafluence.scmxpert.Model.ChangePasswordModel;
import com.exafluence.scmxpert.Model.ForgotPasswordModel;
import com.exafluence.scmxpert.Model.RegistrationModel;
import com.exafluence.scmxpert.Respository.ChangePasswordRepo;
import com.exafluence.scmxpert.Respository.ForgotPasswordRepo;
import com.exafluence.scmxpert.Respository.RegistrationRepo;
import com.exafluence.scmxpert.Respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.time.Instant;
import java.time.LocalDateTime;

@RestController
public class ChangePasswordController {

    @Autowired
    private RegistrationRepo userRepository;

    @Autowired
    private ChangePasswordRepo changePasswordRepo;

    @CrossOrigin
    @PostMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestParam("token") String token, @RequestBody ChangePasswordModel request) {
        // Find the user record by the email
//        RegistrationModel user = userRepository.findByUserEmail(request.getUserEmail());
        RegistrationModel user = userRepository.findByToken(token);
        if (user == null || user.getExpireData().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        user.setUserPassword(request.getNewPassword());
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successfully");

    }

}