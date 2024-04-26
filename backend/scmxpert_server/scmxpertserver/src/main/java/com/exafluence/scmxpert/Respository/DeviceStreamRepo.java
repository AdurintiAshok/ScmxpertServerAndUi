package com.exafluence.scmxpert.Respository;

import com.exafluence.scmxpert.Model.SensorData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeviceStreamRepo  extends MongoRepository<SensorData,String> {
}
