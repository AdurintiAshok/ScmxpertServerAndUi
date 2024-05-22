package com.kafkaproducer.Kafka.Producer.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
public class KafkaProducerService {
    private String TopicName="DeviceStream";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessageToKafka(String message) {
        ObjectMapper objectMapper = new ObjectMapper();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);
        try {
            Object json = objectMapper.readValue(message, Object.class);
            objectMapper.writeValueAsString(json);
            ((Map<String, Object>) json).put("timestamp", formattedDateTime);
            String updatedMessage = objectMapper.writeValueAsString(json);
            kafkaTemplate.send(TopicName, updatedMessage);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}