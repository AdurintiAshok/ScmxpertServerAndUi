package com.kafkaproducer.Kafka.Producer.Runner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerRunner implements CommandLineRunner {

    private final KafkaListenerEndpointRegistry registry;

    public KafkaConsumerRunner(KafkaListenerEndpointRegistry registry) {
        this.registry = registry;
    }

    @Override
    public void run(String... args) throws Exception {
        // Start the Kafka consumer
        registry.start();
    }
}