package com.exafluence.scmxpert.Service;
import com.exafluence.scmxpert.Model.LoginModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.log4j.Log4j2;
import org.paseto4j.commons.PasetoException;
import org.paseto4j.commons.SecretKey;

import org.paseto4j.commons.Version;
import org.paseto4j.version3.Paseto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;


@Log4j2
@Service
public class TokenService {
    @Value("${application.paseto.secretkey}")
   private String secret;
@Value("${application.paseto.footer}")
    private String footer;
    private long expireDate;
    public long getExpireDate() {
        return expireDate;
    }
    public String encrypt(LoginModel loginmodel) {
        String payload;
        try {
            loginmodel.setExpireDate(Instant.now().plus(Duration.ofMinutes(60)));
            payload = mapper().writeValueAsString(loginmodel);
            return Paseto.encrypt(key(), payload, footer);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return e.getMessage();

        } catch (PasetoException e) {
            e.printStackTrace();
            return e.getMessage();
        }
        catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    public boolean decrypt(String token) {
        try {

            String payload = Paseto.decrypt(key(), token, footer);
            LoginModel loginmodel = mapper().readValue(payload,LoginModel.class);
            if (Instant.now().isAfter(loginmodel.getExpireDate())) {
                return false;
            }
            return true;
        }catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (PasetoException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public ResponseEntity<?> loadUserDataFromToken(String token) {
        try {
            String payload = Paseto.decrypt(key(), token, footer);
            LoginModel loginmodel = mapper().readValue(payload, LoginModel.class);
            if (Instant.now().isAfter(loginmodel.getExpireDate())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token Has Expired...Please Login Again");
            }
            loginmodel.setUserPassword("");
            return ResponseEntity.ok(loginmodel);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing token payload");
        } catch (PasetoException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    public SecretKey key() {
        try{
            return new SecretKey(secret.getBytes(StandardCharsets.UTF_8), Version.V3);
        }
        catch (Exception e){
            new IllegalStateException("Failed to create SecretKey");
        }
        return null;
    }

    public JsonMapper mapper() {
        try{
            JsonMapper mapper = new JsonMapper();
            mapper.registerModule(new JavaTimeModule());
            return mapper;
        }
        catch (Exception e){
            new IllegalStateException("Failed to create JsonMapper");
        }
        return null;
    }

}
