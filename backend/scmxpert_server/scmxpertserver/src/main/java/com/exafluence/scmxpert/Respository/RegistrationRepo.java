package com.exafluence.scmxpert.Respository;

import com.exafluence.scmxpert.Model.RegistrationModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RegistrationRepo extends MongoRepository<RegistrationModel,String> {
    RegistrationModel findByUserEmail(String userEmail);
    RegistrationModel findByToken(String token);
}
