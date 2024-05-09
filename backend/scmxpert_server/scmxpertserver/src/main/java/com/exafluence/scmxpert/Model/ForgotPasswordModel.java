package com.exafluence.scmxpert.Model;

import com.mongodb.lang.Nullable;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.models.annotations.OpenAPI31;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "Register")
public class ForgotPasswordModel {

    private ObjectId id;
    private String userEmail;
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private  String token;
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime expireTime;


    public LocalDateTime getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(LocalDateTime expireTime) {
        this.expireTime = expireTime;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    @Nullable
    public String getToken() {
        return token;
    }

    public String getUserEmail() {
        return userEmail;
    }


    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setToken(String token) {
        this.token=token;
    }

}
