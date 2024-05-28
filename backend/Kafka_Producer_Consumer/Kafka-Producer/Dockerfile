FROM openjdk:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file into the container at /app
COPY target/Kafka-Producer-0.0.1-SNAPSHOT.jar producer_consumer.jar

# Command to run the Spring Boot application when the container starts
CMD ["java", "-jar", "producer_consumer.jar"]
