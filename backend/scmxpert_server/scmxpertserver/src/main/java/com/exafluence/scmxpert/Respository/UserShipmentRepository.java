package com.exafluence.scmxpert.Respository;

import com.exafluence.scmxpert.Model.NewShipMent;
import com.exafluence.scmxpert.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserShipmentRepository extends MongoRepository<NewShipMent,String> {
    List<NewShipMent> findByUserEmail(String userEmail);
}
