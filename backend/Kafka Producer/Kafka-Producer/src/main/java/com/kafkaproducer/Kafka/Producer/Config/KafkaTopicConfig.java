package com.kafkaproducer.Kafka.Producer.Config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
private  String TopicName="DeviceStream";
private  int partitionCount=3;
private  int relicaCount=1;
    @Bean
    public NewTopic yourTopic() {
        return TopicBuilder.name("DeviceStream")
                .partitions(partitionCount) // Set the desired number of partitions
                .replicas(relicaCount) // Set the desired number of replicas
                .build();
    }
}