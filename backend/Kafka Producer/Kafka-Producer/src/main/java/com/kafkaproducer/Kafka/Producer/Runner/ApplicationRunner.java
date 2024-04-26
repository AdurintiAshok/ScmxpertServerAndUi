package com.kafkaproducer.Kafka.Producer.Runner;

import com.kafkaproducer.Kafka.Producer.Service.SocketListenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ApplicationRunner implements CommandLineRunner {

    @Autowired
    private SocketListenerService socketListenerService;

    @Override
    public void run(String... args) throws Exception {
        Thread socketListenerThread = new Thread(socketListenerService);
        socketListenerThread.start();
    }
}