package com.kafkaproducer.Kafka.Producer.Runner;

import com.kafkaproducer.Kafka.Producer.Service.SocketListenerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ApplicationRunner implements CommandLineRunner {

    @Autowired
    private SocketListenerService socketListenerService;
    private static final Logger logger = LoggerFactory.getLogger(ApplicationRunner.class);
    @Override
    public void run(String... args) throws Exception {
        try {
            Thread socketListenerThread = new Thread(socketListenerService);
            socketListenerThread.start();
            logger.info("Socket listener thread started successfully.");
        } catch (Exception e) {
            logger.error("Failed to start socket listener thread", e);
            throw e; // Re-throw the exception if you want to propagate it further
        }
    }
}