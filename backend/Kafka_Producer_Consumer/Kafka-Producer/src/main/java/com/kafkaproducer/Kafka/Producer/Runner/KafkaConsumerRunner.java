package com.kafkaproducer.Kafka.Producer.Runner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerRunner implements CommandLineRunner {

    private final KafkaListenerEndpointRegistry registry;
    private static final Logger logger = LoggerFactory.getLogger(KafkaConsumerRunner.class);
    public KafkaConsumerRunner(KafkaListenerEndpointRegistry registry) {
        this.registry = registry;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            registry.start();
            logger.info("Kafka consumer started successfully.");
        } catch (Exception e) {
            logger.error("Failed to start Kafka consumer", e);
            throw e;
        }
    }
}