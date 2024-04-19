package com.exafluence.scmxpert.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Shipment")
public class User {
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    private  String userEmail;
    private String role;

}
