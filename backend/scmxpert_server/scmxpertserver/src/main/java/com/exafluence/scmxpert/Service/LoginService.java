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
                String storedPassword = user.getUserPassword();
                return Objects.equals(password, storedPassword);
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean verify(String email) {
        try {
            LoginModel user = userRepository.findByUserEmail(email);
            if (user != null) {
                String userEmail = user.getuserEmail();
                return Objects.equals(email, userEmail);
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
