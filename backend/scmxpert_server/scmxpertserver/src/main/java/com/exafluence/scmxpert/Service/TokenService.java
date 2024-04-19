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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

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
    private SecretKey key() {
        return new SecretKey(this.secret.getBytes(StandardCharsets.UTF_8), Version.V3);
    }

    private JsonMapper mapper() {
        JsonMapper mapper = new JsonMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }

}
