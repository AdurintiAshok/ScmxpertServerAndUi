package com.exafluence.scmxpert.Respository;
import com.exafluence.scmxpert.Model.ForgotPasswordModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Controller;

public interface ForgotPasswordRepo extends MongoRepository<ForgotPasswordModel, String> {
    ForgotPasswordModel findByUserEmail(String email);
    ForgotPasswordModel findByToken(String token);
}
