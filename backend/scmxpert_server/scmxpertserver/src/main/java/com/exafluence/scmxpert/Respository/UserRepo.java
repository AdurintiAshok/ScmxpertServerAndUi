package com.exafluence.scmxpert.Respository;

import com.exafluence.scmxpert.Model.RegistrationModel;
import com.exafluence.scmxpert.Model.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo  extends MongoRepository<UserData,String> {
    UserData findByUserEmail(String userEmail);
}
