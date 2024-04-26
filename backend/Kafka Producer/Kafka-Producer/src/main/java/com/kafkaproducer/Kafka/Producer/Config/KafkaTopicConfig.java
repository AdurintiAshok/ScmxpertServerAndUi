package com.kafkaproducer.Kafka.Producer.Config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic yourTopic() {
        return TopicBuilder.name("DeviceStream")
                .partitions(3) // Set the desired number of partitions
                .replicas(1) // Set the desired number of replicas
                .build();
    }
}