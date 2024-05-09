package com.exafluence.scmxpert.Service;

import com.exafluence.scmxpert.Model.ForgotPasswordModel;
import com.exafluence.scmxpert.Model.LoginModel;
import com.exafluence.scmxpert.Model.RegistrationModel;
import com.exafluence.scmxpert.Respository.ForgotPasswordRepo;
import com.exafluence.scmxpert.Respository.RegistrationRepo;
import com.exafluence.scmxpert.Respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ForgotPasswordService {
    @Autowired
    public Environment environment;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private RegistrationRepo registrationRepo;

//
//    @Value("${spring.mail.port}")
//    private String serverPort;
    private String resetPasswordUrl;
    public boolean resetPassword(String email) {
        try {
            String resetPasswordUrl = environment.getProperty("APPLICATION_RESET_PASSWORD_URL");
            RegistrationModel user = registrationRepo.findByUserEmail(email);
            if (user != null) {
                String token = UUID.randomUUID().toString();
                user.setToken(token);
                LocalDateTime expirationDateTime = LocalDateTime.now().plusMinutes(5);
                user.setExpireTime(expirationDateTime);
                registrationRepo.save(user);
                String resetPasswordLink = resetPasswordUrl + token;
                sendEmailWithResetLink(email, resetPasswordLink);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public void sendEmailWithResetLink(String email, String resetPasswordLink) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("Reset Password");
            mailMessage.setText("To Reset Your Password Please Click on This Following link. This link is only available for the next 5 minutes: " + resetPasswordLink);
            mailSender.send(mailMessage);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }
}