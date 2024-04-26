package com.kafkaproducer.Kafka.Producer.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import javax.print.Doc;

@Service
public class KafkaConsumerService {
    @Value("spring.data.mongodb.uri")
    private String mongoUri;
    @Value("spring.data.mongodb.database")
    private String mongoDatabase;

    private String mongoCollection="DeviceStream";

    MongoClient mongoClient = MongoClients.create("mongodb+srv://codewithadurintiashok:Ashok12345@scmserver.rcyhq.mongodb.net/JobSearch");
    MongoDatabase mongodatabase = mongoClient.getDatabase("JobSearch");
    private MongoCollection<Document> mongocollection =mongodatabase.getCollection(mongoCollection);
    @KafkaListener(topics = "DeviceStream", groupId = "my-consumer-group")
    public void consumeMessage(String message) {
        System.out.println("Received message: " + message);
        Document doc=  Document.parse(message);
        System.out.println(doc);
        mongocollection.insertOne(doc);
        System.out.println("insertion on...11111");
    }


}