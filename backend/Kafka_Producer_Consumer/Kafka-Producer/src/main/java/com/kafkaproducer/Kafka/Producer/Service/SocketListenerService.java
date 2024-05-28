package com.kafkaproducer.Kafka.Producer.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

@Service
public class SocketListenerService implements Runnable {
    @Autowired
    private KafkaProducerService kafkaProducerService;
    @Value("${socket.host}")
    private  String SERVER_HOST;
   @Value("${socket.port}")
    private  int SERVER_PORT;

    @Override
    public void run() {
        try {
            Socket clientSocket = new Socket(SERVER_HOST, SERVER_PORT);
            System.out.println("Connected to server");
            BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            String message;
            while ((message = reader.readLine()) != null) {
                kafkaProducerService.sendMessageToKafka(message);
            }
            reader.close();
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
