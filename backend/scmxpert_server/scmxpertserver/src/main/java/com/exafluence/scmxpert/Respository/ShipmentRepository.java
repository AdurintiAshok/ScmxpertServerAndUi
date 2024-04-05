package com.exafluence.scmxpert.Respository;

import com.exafluence.scmxpert.Model.NewShipMent;
import com.exafluence.scmxpert.Model.RegistrationModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ShipmentRepository extends MongoRepository<NewShipMent, String> {
    NewShipMent findByShipmentNumber(String shipmentNumber);
}
