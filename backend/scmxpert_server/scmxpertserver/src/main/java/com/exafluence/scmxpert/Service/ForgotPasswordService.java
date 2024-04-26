package com.exafluence.scmxpert.Service;

import com.exafluence.scmxpert.Model.ForgotPasswordModel;
import com.exafluence.scmxpert.Model.LoginModel;
import com.exafluence.scmxpert.Model.RegistrationModel;
import com.exafluence.scmxpert.Respository.ForgotPasswordRepo;
import com.exafluence.scmxpert.Respository.RegistrationRepo;
import com.exafluence.scmxpert.Respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ForgotPasswordService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private RegistrationRepo registrationRepo;


    @Value("${spring.mail.port}")
    private String serverPort;
    @Value("${app.resetPassword.url}")
    private String resetPasswordUrl;
    public boolean resetPassword(String email) {
        RegistrationModel user = registrationRepo.findByUserEmail(email);
        if (user != null) {
            String token = UUID.randomUUID().toString();
            user.setToken(token);
            LocalDateTime expirationDateTime = LocalDateTime.now().plusMinutes(5);
            user.setExpireTime(expirationDateTime);
            registrationRepo.save(user);
            String resetPasswordLink = resetPasswordUrl+token;
            sendEmailWithResetLink(email, resetPasswordLink);
            return true;
        }

        else{
            return  false;
        }
    }


    private void sendEmailWithResetLink(String email, String resetPasswordLink) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Reset Password");
        mailMessage.setText("To Reset Your Password Please Click on This Following link.this link is only available for next 5 minutes   " + resetPasswordLink);
        mailSender.send(mailMessage);
    }
}