package com.kafkaproducer.Kafka.Producer;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertiesPropertySource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

@SpringBootApplication
public class KafkaProducerApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(KafkaProducerApplication.class);
		app.addInitializers(context -> {
			ConfigurableEnvironment env = context.getEnvironment();
			loadPropertiesFromEnvFile(env);
		});
		app.run(args);
	}

	private static void loadPropertiesFromEnvFile(ConfigurableEnvironment env) {
		String envFile = env.getProperty("spring.config.location");
		if (envFile != null && envFile.endsWith(".env")) {
			try {
				Properties props = new Properties();
				props.load(Files.newInputStream(Path.of(envFile)));
				env.getPropertySources().addLast(new PropertiesPropertySource("env", props));
			} catch (IOException e) {
				throw new IllegalStateException("Failed to load properties from " + envFile, e);
			}
		}

	}

}
