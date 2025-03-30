# Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Fix: Match the build stage WORKDIR (/build, not /app)
COPY --from=build /build/target/workout-*.jar app.jar

EXPOSE 5454

ENV DB_URL="jdbc:mysql://host.docker.internal:3306/workout"
ENTRYPOINT ["java", "-jar", "app.jar"]