package com.exafluence.scmxpert;
import lombok.Data;
import java.time.Instant;

@Data
public class AppToken {

    // A unique id from user table in database
    private String userId;

    // User's role, this attribute is optional
    private String role;

    // An instant Java date to indicates expiration of token
    private Instant expiresDate;

}
