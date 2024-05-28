package com.kafkaproducer.Kafka.Producer.Config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

@Configuration
public class KafkaProducerConfig {
    @Value("${spring.cloud.stream.kafka.binder.brokers}")
    private  String serverHost;
    private static final Logger logger = LoggerFactory.getLogger(KafkaProducerConfig.class);
    @Bean
    public ProducerFactory<String, String> producerFactory() {


        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, serverHost);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);

        try {
            return new DefaultKafkaProducerFactory<>(configProps);
        } catch (Exception e) {
            logger.error("Failed to create Kafka ProducerFactory", e);
            throw new RuntimeException("Kafka ProducerFactory creation failed", e);
        }
    }
    @Bean
    public KafkaTemplate<String, String> kafkaTemplate() {
        try {
            return new KafkaTemplate<>(producerFactory());
        } catch (Exception e) {
            logger.error("Failed to create KafkaTemplate", e);
            throw new RuntimeException("KafkaTemplate creation failed", e);
        }
    }
}