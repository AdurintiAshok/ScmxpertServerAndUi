package com.exafluence.scmxpert.Controller;
import com.exafluence.scmxpert.Model.NewShipMent;
import com.exafluence.scmxpert.Service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NewShipMentController {
    @Autowired
    private ShipmentService shipmentService;
    @CrossOrigin
    @PostMapping("/new-shipment")
    public ResponseEntity<Object> createShipment(@RequestBody NewShipMent shipment) {
        try {
            // Check if shipment ID already exists
            NewShipMent existingShipment = shipmentService.getShipmentByShipmentNumber(shipment.getShipmentNumber());
            if (existingShipment != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Shipment ID already exists.");
            }

            // If shipment ID doesn't exist, proceed to create the shipment
            shipmentService.createShipment(shipment);

            return ResponseEntity.status(HttpStatus.OK).body("Succesfully Created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create shipment.");
        }
    }
    @CrossOrigin
    @GetMapping("/shipments")
    public ResponseEntity<Object> getShipmentByNumber() {
        try {
            List<NewShipMent> shipments = shipmentService.getAllShipments();
            return ResponseEntity.ok().body(shipments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve shipments.");
        }
    }
    }



