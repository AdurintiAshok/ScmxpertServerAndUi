package com.kafkaproducer.Kafka.Producer.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
public class KafkaProducerService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessageToKafka(String message) {
        // Create a JSON object mapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Get current date and time
        LocalDateTime now = LocalDateTime.now();

        // Format date and time as string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);

        try {
            // Convert the input message to a JSON object
            Object json = objectMapper.readValue(message, Object.class);

            // Add date and time to the JSON object
            objectMapper.writeValueAsString(json);
            ((Map<String, Object>) json).put("timestamp", formattedDateTime);

            // Convert JSON object back to string
            String updatedMessage = objectMapper.writeValueAsString(json);

            // Send the updated message to Kafka
            kafkaTemplate.send("DeviceStream", updatedMessage);

            // Log the event
            System.out.println("Clicked Event");
        } catch (IOException e) {
            // Handle exception
            e.printStackTrace();
        }

    }
}