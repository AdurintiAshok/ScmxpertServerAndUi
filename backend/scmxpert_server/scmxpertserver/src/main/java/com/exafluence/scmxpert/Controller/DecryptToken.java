package com.exafluence.scmxpert.Controller;

import com.exafluence.scmxpert.Service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DecryptToken {
    @Autowired
    private TokenService tokenService;
    @CrossOrigin({"*"})
    @GetMapping("/decrypt-token")
    public ResponseEntity<?> profileData(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String token = authorizationHeader.substring(7);
                ResponseEntity<?> userData = tokenService.loadUserDataFromToken(token);
                Object body = userData.getBody();
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(body);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No bearer token found in the request header");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token format");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }
}
