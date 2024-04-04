package com.exafluence.scmxpert.Service;
import com.exafluence.scmxpert.Model.LoginModel;
import com.exafluence.scmxpert.Model.RegistrationModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.log4j.Log4j2;
import org.paseto4j.commons.PasetoException;
import org.paseto4j.commons.SecretKey;
import org.paseto4j.commons.Version;
import org.paseto4j.version3.Paseto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;

@Log4j2
@Service
public class TokenService {

    @Value("${app.token.secret}")
    String secret;

    @Value("${app.token.footer}")
    String footer;
    @Value("${expireDate}")
    private long expireDate;

    public long getExpireDate() {
        return expireDate;
    }
    public Optional<String> encrypt(LoginModel token) {
        String payload;
        try {
            token.setExpireDate(Instant.now().plus(Duration.ofHours(getExpireDate())));
            payload = mapper().writeValueAsString(token);
            return Optional.of(Paseto.encrypt(key(), payload, footer));
        } catch (PasetoException | JsonProcessingException e) {
            return Optional.empty();
        }
    }

    public boolean decrypt(String token) {
        try {
            String payload = Paseto.decrypt(key(), token, footer);
            System.out.println(payload);
            LoginModel loginmodel = mapper().readValue(payload,LoginModel.class);
            if (Instant.now().isAfter(loginmodel.getExpireDate())) {
                return false;
            }
            return true;
        } catch (PasetoException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    private SecretKey key() {
        return new SecretKey(this.secret.getBytes(StandardCharsets.UTF_8), Version.V3);
    }

    private JsonMapper mapper() {
        JsonMapper mapper = new JsonMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }

}
