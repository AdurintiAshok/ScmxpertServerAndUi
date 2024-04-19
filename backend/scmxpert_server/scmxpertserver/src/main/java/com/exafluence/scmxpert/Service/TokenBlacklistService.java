package com.exafluence.scmxpert.Service;
import com.exafluence.scmxpert.Model.BlacklistedToken;
import com.exafluence.scmxpert.Respository.TokenBlackListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {
    @Autowired
    private TokenBlackListRepo tokenBlackListRepo;
    private Set<String> blacklist = ConcurrentHashMap.newKeySet();


    public void addToBlacklist(String token) {
        BlacklistedToken blacklistedToken = new BlacklistedToken(token);
        tokenBlackListRepo.save(blacklistedToken);
    }

    public boolean isBlacklisted(String token) {
        BlacklistedToken blacklistedToken = tokenBlackListRepo.findByToken(token);
        return blacklistedToken != null;
    }
}
