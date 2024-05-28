package com.kafkaproducer.Kafka.Producer.Config;

import org.apache.kafka.clients.admin.NewTopic;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
private  String TopicName="DeviceStream";
private  int partitionCount=3;
private final int relicaCount=1;
    private static final Logger logger = LoggerFactory.getLogger(KafkaTopicConfig.class);
    @Bean
    public NewTopic yourTopic() {
        int partitionCount = 3;
        int replicaCount = 1;

        try {
            return TopicBuilder.name("DeviceStream")
                    .partitions(partitionCount)
                    .replicas(replicaCount)
                    .build();
        } catch (Exception e) {
            logger.error("Failed to create Kafka Topic", e);
            throw new RuntimeException("Kafka Topic creation failed", e);
        }
    }
}