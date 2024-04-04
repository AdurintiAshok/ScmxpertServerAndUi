package com.exafluence.scmxpert.Respository;

import com.exafluence.scmxpert.Model.LoginModel;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Controller;


@Controller
public interface UserRepository extends MongoRepository<LoginModel, Long> {
    LoginModel findByUserEmail(String userEmail);
}
