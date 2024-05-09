package com.exafluence.scmxpert.Controller;
import com.exafluence.scmxpert.Model.NewShipMent;
import com.exafluence.scmxpert.Model.RegistrationModel;
import com.exafluence.scmxpert.Model.User;
import com.exafluence.scmxpert.Respository.RegistrationRepo;
import com.exafluence.scmxpert.Service.ShipmentService;
import com.exafluence.scmxpert.Service.TokenBlacklistService;
import com.exafluence.scmxpert.Service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
public class NewShipMentController {
    @Autowired
    private ShipmentService shipmentService;
    @Autowired
    private TokenService service;
    @Autowired
    private RegistrationRepo registrationRepo;
    @Autowired
    private TokenBlacklistService tokenBlacklistService;


    @CrossOrigin
    @PostMapping("/new-shipment")
    public ResponseEntity<Object> createShipment(@RequestBody NewShipMent shipment) {
        try {
            NewShipMent existingShipment = shipmentService.getShipmentByShipmentNumber(shipment.getShipmentNumber());
            if (existingShipment != null ) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Shipment ID already exists.");
            }
            shipmentService.createShipment(shipment);

            return ResponseEntity.status(HttpStatus.OK).body("Succesfully Created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create shipment.");
        }
    }
    @CrossOrigin
    @PostMapping("/shipments")
    public ResponseEntity<Object> getShipmentByNumber(@RequestHeader("Authorization") String token, @RequestBody User user) {
        if (isValidToken(token) && !tokenBlacklistService.isBlacklisted(token) ) {
            try {
               List<NewShipMent> shipments = shipmentService.getAllShipments(user.getUserEmail(),user.getRole());
                return ResponseEntity.ok().body(shipments);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve shipments.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }
    @CrossOrigin
    @GetMapping("/users")
    public ResponseEntity<Object> getUsers(@RequestHeader("Authorization") String token) {
        if (isValidToken(token) && !tokenBlacklistService.isBlacklisted(token) ) {
            try {
                List<RegistrationModel> shipments = registrationRepo.findAll();
                return ResponseEntity.ok().body(shipments);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve user Data.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or Expired token.");
        }
    }
    // Method to validate token
    private boolean isValidToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            try {
                String tokenValue = token.substring(7);
                return service.decrypt(tokenValue);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }
    }



