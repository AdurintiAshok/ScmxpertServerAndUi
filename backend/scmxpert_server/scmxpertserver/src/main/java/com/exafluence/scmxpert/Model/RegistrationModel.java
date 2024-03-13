package com.exafluence.scmxpert.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserRegistration")
public class RegistrationModel {
    private String username;
    private String email;
    private String role;
    private String password;
    public RegistrationModel() {

    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getRole() {
        return role;
    }


}
