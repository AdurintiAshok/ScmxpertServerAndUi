package com.exafluence.scmxpert.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blacklist")
public class BlacklistedToken {
    @Id
    private String token;

    public BlacklistedToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
