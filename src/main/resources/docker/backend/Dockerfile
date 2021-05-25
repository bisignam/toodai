FROM openjdk:8
LABEL maintainer="bisignam@gmail.com"
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} toodai.jar
ENTRYPOINT ["java","-jar","/toodai.jar"]
