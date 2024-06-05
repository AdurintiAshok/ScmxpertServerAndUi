package com.exafluence.scmxpert.Model;


import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserData")
public class UserData {
    private  String userEmail;
    private  String userName;
    private  String role;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
