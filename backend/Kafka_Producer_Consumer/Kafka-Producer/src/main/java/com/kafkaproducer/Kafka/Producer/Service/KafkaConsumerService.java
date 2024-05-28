package com.kafkaproducer.Kafka.Producer.Service;


import com.mongodb.client.MongoCollection;

import org.bson.Document;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

//import javax.annotation.PostConstruct;

@Service
public class KafkaConsumerService {

    private static final Logger logger = LoggerFactory.getLogger(KafkaConsumerService.class);

//    @Value("${spring.data.mongodb.uri}")
//    private String mongoUri;

    @Autowired
    private MongoCollection<Document> collection;

//    @Value("${spring.data.mongodb.database}")
//    private String mongoDatabase;
//
//    private String mongoCollection = "DeviceStream";
//
//    private MongoClient mongoClient;
//    private MongoDatabase database;
//    private MongoCollection<Document> collection;

//    @PostConstruct
//    public void init() {
//        try {
//            mongoClient = MongoClients.create(mongoUri);
//            database = mongoClient.getDatabase(mongoDatabase);
//            collection = database.getCollection(mongoCollection);
//            logger.info("MongoDB client initialized successfully");
//        } catch (Exception e) {
//            logger.error("Failed to initialize MongoDB client", e);
//            throw new RuntimeException("Failed to initialize MongoDB client", e);
//        }
//    }

    @KafkaListener(topics = "DeviceStream", groupId = "my-consumer-group")
    public void consumeMessage(String message) {
        try {
            logger.info("Received message: " + message);
            Document doc = Document.parse(message);
            logger.info("Parsed document: " + doc);
            collection.insertOne(doc);
            logger.info("Document inserted into MongoDB collection");
        } catch (Exception e) {
            logger.error("Failed to process and insert message into MongoDB", e);
        }
    }
}
