package com.exafluence.scmxpert.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "Register")
public class LoginModel {
    private  String userEmail;
    private  String userPassword;
    private  Instant expireDate;

    public void setuserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public void setExpireDate(Instant expireDate) {
        this.expireDate = expireDate;
    }

    public LoginModel() {
      
    }

    public String getuserEmail() {
        return userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public Instant getExpireDate() {
        return expireDate;
    }

    public static class User {

    }
}
