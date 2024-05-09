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

    @PostMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestParam("token") String token, @RequestBody ChangePasswordModel request) {
        try {
            RegistrationModel user = userRepository.findByToken(token);
            if (user == null || user.getExpireData().isBefore(LocalDateTime.now())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
            }
            user.setUserPassword(request.getNewPassword());
            userRepository.save(user);
            return ResponseEntity.ok("Password reset successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

}