package com.exafluence.scmxpert.Controller;

import com.exafluence.scmxpert.Model.NewShipMent;
import com.exafluence.scmxpert.Model.SensorData;
import com.exafluence.scmxpert.Respository.DeviceStreamRepo;
import com.exafluence.scmxpert.Service.TokenBlacklistService;
import com.exafluence.scmxpert.Service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DeviceStreamController {
    @Autowired
    private DeviceStreamRepo deviceStreamRepo;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private TokenBlacklistService tokenBlacklistService;
    @CrossOrigin({"*"})
    @GetMapping("/streamdata")
    public ResponseEntity<Object> getDeviceStream(@RequestHeader("Authorization") String token) {
        if (isValidToken(token) && !tokenBlacklistService.isBlacklisted(token)) {
            try {
                List<SensorData> shipments = deviceStreamRepo.findAll();
                return ResponseEntity.ok(shipments);
            } catch (DataAccessException e) {

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            } catch (IllegalArgumentException e) {

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            } catch (Exception e) {

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
        } else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }

    private boolean isValidToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            try {
                String tokenValue = token.substring(7);
                return tokenService.decrypt(tokenValue);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }

}
