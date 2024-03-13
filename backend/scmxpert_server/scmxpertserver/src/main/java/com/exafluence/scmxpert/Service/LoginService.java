package com.exafluence.scmxpert.Service;

import com.exafluence.scmxpert.Model.LoginModel;
import com.exafluence.scmxpert.Respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String email, String password) {
        try {
            LoginModel user = userRepository.findByEmail(email);
            if (user != null) {
                String storedPassword = user.getPassword();
                // Password does not match
                return Objects.equals(password, storedPassword); // Authentication successful
            } else {
                return false; // User not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Error occurred during authentication
        }
    }
}

