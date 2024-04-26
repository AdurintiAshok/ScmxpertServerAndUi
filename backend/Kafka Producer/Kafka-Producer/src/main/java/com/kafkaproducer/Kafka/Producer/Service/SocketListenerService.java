package com.kafkaproducer.Kafka.Producer.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

@Service
public class SocketListenerService implements Runnable {

    @Autowired
    private KafkaProducerService kafkaProducerService;

    private static final String SERVER_HOST = "localhost";
    private static final int SERVER_PORT = 12345;

    @Override
    public void run() {
        try {
            // Connect to the server
            Socket clientSocket = new Socket(SERVER_HOST, SERVER_PORT);
            System.out.println("Connected to server");

            // Read incoming messages from the server
            BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            String message;
            while ((message = reader.readLine()) != null) {
                // Send message to Kafka
                System.out.println("Hey Ashok"+ message);
                kafkaProducerService.sendMessageToKafka(message);
            }

            // Close resources
            reader.close();
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
