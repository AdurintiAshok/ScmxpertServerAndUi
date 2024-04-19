package com.exafluence.scmxpert.Model;

import java.time.Instant;
import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Register")
public class RegistrationModel {
    private ObjectId id;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public LocalDateTime getExpireData() {
        return expireData;
    }

    public void setExpireData(LocalDateTime expireData) {
        this.expireData = expireData;
    }

    private String userName;
    private String userEmail;
    private String role;
    private String userPassword;
    private String token;
    private LocalDateTime expireData;

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

    public void setToken(String token) {
        this.token=token;
    }

    public void setExpireTime(LocalDateTime expirationDateTime) {
        this.expireData=expirationDateTime;
    }
}
