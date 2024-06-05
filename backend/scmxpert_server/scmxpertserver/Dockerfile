# Use an official OpenJDK runtime as the base image
FROM openjdk:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/SCM_SERVER-0.0.1-SNAPSHOT.jar /app/SCM_SERVER-0.0.1-SNAPSHOT.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "SCM_SERVER-0.0.1-SNAPSHOT.jar"]