FROM maven:3.8.8-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY . .
RUN mvn clean package -DskipTests

FROM amazoncorretto:21.0.3-alpine3.19

COPY --from=build /app/target/triptrail-0.0.1-SNAPSHOT.jar triptrail.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","triptrail.jar"]