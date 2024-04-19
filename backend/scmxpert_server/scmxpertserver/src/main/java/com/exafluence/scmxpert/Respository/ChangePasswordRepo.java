package com.exafluence.scmxpert.Respository;

import com.exafluence.scmxpert.Model.ChangePasswordModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChangePasswordRepo extends MongoRepository<ChangePasswordModel,String> {
    ChangePasswordModel findByUserEmail(String token);
}
