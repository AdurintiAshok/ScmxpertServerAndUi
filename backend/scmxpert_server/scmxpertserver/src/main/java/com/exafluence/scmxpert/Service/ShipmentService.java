package com.exafluence.scmxpert.Service;

import com.exafluence.scmxpert.Model.NewShipMent;
import com.exafluence.scmxpert.Respository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    public void createShipment(NewShipMent shipment) {
        // Your logic to save the shipment to the database
        shipmentRepository.save(shipment);
    }

    public NewShipMent getShipmentByShipmentNumber(String shipmentNumber) {
        // Your logic to retrieve the shipment from the database by shipment number
        return shipmentRepository.findByShipmentNumber(shipmentNumber);
    }
    public List<NewShipMent> getAllShipments() {
        // Implement logic to retrieve all shipments from the data source
        return shipmentRepository.findAll(); // Assuming findAll() method is provided by ShipmentRepository
    }
    // Add more methods as needed

}
