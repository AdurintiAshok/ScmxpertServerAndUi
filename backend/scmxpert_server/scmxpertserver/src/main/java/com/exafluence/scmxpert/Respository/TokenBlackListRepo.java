package com.exafluence.scmxpert.Respository;

import com.exafluence.scmxpert.Model.BlacklistedToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TokenBlackListRepo  extends MongoRepository<BlacklistedToken,String> {
    BlacklistedToken findByToken(String token);
}
