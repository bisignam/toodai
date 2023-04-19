# Toodai
Minimalistic, bloat-free, personal bookmarks organizer and search engine for the busy developer.

# What is it?
***Toodai*** is an open source social bookmarking web application.
The word Toodai is an english adaptation of the japanese word 灯台, which roughly translates to lighthouse.

The project aims to be a flexible and lightweight solution to easily share and explore bookmarks.
The application is specifically targeted at developers and tech enthusiasts that often need to organize and find back links to confluence pages, issue trackers, company wikis and several other resources.

One of the key features of Toodai is the abilty to quickly perform full text queries on your personal bookmarks, allowing developers to esily find resources without using clumsy/slow systems like standard browsers bookmarks and folders.

# Backend development setup

## Pre-requisites

### Install docker and docker-compose

* [docker](https://www.docker.com/) installed (see [docker installation documentation](https://docs.docker.com/engine/install/) for details on how to install it)
* [docker-compose](https://docs.docker.com/compose/) installed (see [docker-compose installation documentation](https://docs.docker.com/compose/install/other/) for details on how to install it)
* java jdk version >= 11 (the easiest way to install java is to use [sdkman](https://sdkman.io/install))

## Additional setup for the elasticsearch container

```
sudo sh -c 'echo 'vm.max_map_count=262144' > /etc/sysctl.conf'
sudo sysctl -p
```

> The previous commands are required to run the elasticsearch container on linux. See [this link](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#docker-prod-prerequisites) for more details.

## Build the backend

Go to the root of the project and run

```console 
./mvnw clean package
```

Alternatively, if you don't want to run the tests, you can run
```console 
./mvnw clean package -DskipTests
```

## Run the backend

Go to the root of the project and run

```console
docker-compose --profile local up -d --build
```

> The previous command will launch all the required containers in the background and build the images if needed.
It will not start the application though, just the dependencies.

To run the main application, go to the root of the project and run
    
```console
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

# Frontend development setup

### Prerequisites

* [nodejs](https://nodejs.org/) >= 16 (see [nodejs installation documentation](https://nodejs.org/en/download/) if you are  interested in further installation details)

The easiest way to install nodejs is to use [nvm](https://github.com/nvm-sh/nvm), which can be installed with

```console
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Once nvm is installed you can install nodejs version 16 with

```console
nvm install 16
```

Then to build the frontend, go to `src/main/toodaifrontend` and run
```console
npm run build
```

Then to run the frontend, go to `src/main/toodaifrontend` and run

```console
npm run start
```

# Swagger UI

Once the backend is up and running, you can access the swagger ui at `http://localhost:8080/swagger-ui.html#/`.