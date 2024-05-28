package com.kafkaproducer.Kafka.Producer.Config;

import java.util.HashMap;
import java.util.Map;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

@EnableKafka
@Configuration
public class KafkaConsumerConfig {
    private static final Logger logger = LoggerFactory.getLogger(KafkaConsumerConfig.class);
    @Value("${spring.kafka.producer.bootstrap-servers}")
    private  String serverHost;
    @Value("${spring.kafka.consumer.group-id}")
    private  String kafkaGroupId;

    @Bean
    public ConsumerFactory<String, String> consumerFactory() {

        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, serverHost);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, kafkaGroupId);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);

        try {
            return new DefaultKafkaConsumerFactory<>(props);
        } catch (Exception e) {
            logger.error("Failed to create Kafka ConsumerFactory", e);
            throw new RuntimeException("Kafka ConsumerFactory creation failed", e);
        }
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, String> factory = new ConcurrentKafkaListenerContainerFactory<>();
        try {
            factory.setConsumerFactory(consumerFactory());
        } catch (Exception e) {
            logger.error("Failed to set ConsumerFactory in KafkaListenerContainerFactory", e);
            throw new RuntimeException("KafkaListenerContainerFactory creation failed", e);
        }
        return factory;
    }

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Value("${spring.data.mongodb.database}")
    private String mongoDatabase;

    private String mongoCollection = "DeviceStream";

    @Bean
    public MongoCollection<Document> getMongoClient() {
        try {
            MongoClient mongoClient = MongoClients.create(mongoUri);
            MongoDatabase database = mongoClient.getDatabase(mongoDatabase);
            logger.info("MongoDB client initialized successfully");
            return database.getCollection(mongoCollection);
        } catch (Exception e) {
            logger.error("Failed to initialize MongoDB client", e);
            throw new RuntimeException("Failed to initialize MongoDB client", e);
        }
    }
}