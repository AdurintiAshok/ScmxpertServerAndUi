package com.exafluence.scmxpert.Service;

import com.exafluence.scmxpert.Model.NewShipMent;
import com.exafluence.scmxpert.Model.User;
import com.exafluence.scmxpert.Respository.ShipmentRepository;
import com.exafluence.scmxpert.Respository.UserShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;
    @Autowired
    private UserShipmentRepository userShipmentRepository;
    private String userRole ="Admin";
    public void createShipment(NewShipMent shipment) {
        try {
            shipmentRepository.save(shipment);
        } catch (Exception e) {
            e.printStackTrace();

        }
    }

    public NewShipMent getShipmentByShipmentNumber(String shipmentNumber) {
        try {
            return shipmentRepository.findByShipmentNumber(shipmentNumber);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<NewShipMent> getAllShipments(String email, String role) {
        try {
            if (userRole.equals(role)) {
                return userShipmentRepository.findAll();
            } else {
                return userShipmentRepository.findByUserEmail(email);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
