package com.exafluence.scmxpert.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserRegistration")
public class LoginModel {
    private  String email;
    private  String password;
    public String getEmail() {
        return email;
    }

    public LoginModel() {

    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }



}
