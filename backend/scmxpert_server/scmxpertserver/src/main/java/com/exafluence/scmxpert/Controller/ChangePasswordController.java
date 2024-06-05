package com.exafluence.scmxpert.Controller;
import com.exafluence.scmxpert.Model.ChangePasswordModel;
import com.exafluence.scmxpert.Model.RegistrationModel;
import com.exafluence.scmxpert.Respository.ChangePasswordRepo;
import com.exafluence.scmxpert.Respository.RegistrationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
public class ChangePasswordController {

    @Autowired
    private RegistrationRepo registrationRepo;

    @Autowired
    private ChangePasswordRepo changePasswordRepo;
    @CrossOrigin({"*"})
    @PostMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestParam("token") String token, @RequestBody ChangePasswordModel request) {
        try {
            RegistrationModel user = registrationRepo.findByToken(token);
            if (user == null || user.getExpireData().isBefore(LocalDateTime.now())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
            }
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encryptedPassword = passwordEncoder.encode(request.getNewPassword());
            user.setUserPassword(encryptedPassword);
            registrationRepo.save(user);
            return ResponseEntity.ok("Password reset successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

}