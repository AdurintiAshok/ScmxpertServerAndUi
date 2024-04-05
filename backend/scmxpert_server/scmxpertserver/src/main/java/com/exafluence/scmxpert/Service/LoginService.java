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
            LoginModel user = userRepository.findByUserEmail(email);
            if (user != null) {
                System.out.println("I Am Ashok"+user);
                String storedPassword = user.getUserPassword();
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
    public  boolean Verify(String email) {
        try {
            LoginModel user = userRepository.findByUserEmail(email);
            if (user != null) {
                String useremail = user.getuserEmail();
                // Password does not match
                return Objects.equals(email, useremail); // Authentication successful
            } else {
                return false; // User not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Error occurred during authentication
        }
    }

}

