package com.exafluence.scmxpert.Controller;

import com.exafluence.scmxpert.Model.ForgotPasswordModel;
import com.exafluence.scmxpert.Service.ForgotPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ForgotPasswordController {
    @Autowired
    private ForgotPasswordService forgotPasswordService;
@CrossOrigin
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordModel request) {
        String email = request.getUserEmail();
        System.out.println(email);
       boolean result= forgotPasswordService.resetPassword(email);
        if(result){
            return ResponseEntity.ok("Reset password email sent successfully.");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User with email " + email + " does not exist. Unable to send reset password email.");
        }
    }
}
