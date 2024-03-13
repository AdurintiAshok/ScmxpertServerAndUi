package com.exafluence.scmxpert.Respository;

import com.exafluence.scmxpert.Model.LoginModel;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<LoginModel, Long> {
    LoginModel findByEmail(String email);
}
