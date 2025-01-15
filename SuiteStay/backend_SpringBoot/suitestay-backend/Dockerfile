# FROM openjdk:22-jdk
# ARG JAR_FILE=target/*.jar
# COPY ${JAR_FILE} app.jar
# EXPOSE 8080
# CMD ["java","-jar","/app.jar"]
# Use Maven base image with OpenJDK

FROM maven:3.9.8-eclipse-temurin-22 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Run mvn clean package to build the JAR file
RUN mvn clean package -DskipTests

# Use OpenJDK for running the app
FROM openjdk:22-jdk


# Copy the JAR file built by Maven in the previous stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port that your application will run on
EXPOSE 8080

# Command to run the JAR file
CMD ["java", "-jar", "/app.jar"]
