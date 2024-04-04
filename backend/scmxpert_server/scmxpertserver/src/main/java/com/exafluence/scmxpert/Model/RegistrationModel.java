package com.exafluence.scmxpert.Model;

import java.time.Instant;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Register")
public class RegistrationModel {
    private String userName;
    private String userEmail;
    private String role;
    private String userPassword;
    public RegistrationModel() {

    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserName() {
        return userName;
    }
    public String getUserEmail() {
        return userEmail;
    }
    public String getUserPassword() {
        return userPassword;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getRole() {
        return role;
    }





}
