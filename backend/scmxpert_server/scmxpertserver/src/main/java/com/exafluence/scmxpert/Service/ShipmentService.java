package com.exafluence.scmxpert.Service;

import com.exafluence.scmxpert.Model.NewShipMent;
import com.exafluence.scmxpert.Model.User;
import com.exafluence.scmxpert.Respository.ShipmentRepository;
import com.exafluence.scmxpert.Respository.UserShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;
    @Autowired
    private UserShipmentRepository userShipmentRepository;

    public void createShipment(NewShipMent shipment) {
        // Your logic to save the shipment to the database
        shipmentRepository.save(shipment);
    }

    public NewShipMent getShipmentByShipmentNumber(String shipmentNumber) {
        // Your logic to retrieve the shipment from the database by shipment number
        return shipmentRepository.findByShipmentNumber(shipmentNumber);
    }
    public List<NewShipMent> getAllShipments(String email,String role) {
        if ("Admin".equals(role)) {
            // If user is an admin, return all shipments
            return userShipmentRepository.findAll();
        } else {
            // If user is not an admin, return shipments associated with the provided email
            return userShipmentRepository.findByUserEmail(email);
        }
    }
    // Add more methods as needed

}
