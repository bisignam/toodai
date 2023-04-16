# Toodai

Toodai is an open source social bookmarking web application.
The word Toodai is an english adaptation of the japanese word 灯台 which roughly translates to lighthouse.

The projects aims to be a flexible and lightweight solution to easily share and explore bookmarks.

# Development setup

In order to compile and run toodai you need:

* java jdk version >= 11

## Compile the backed

Go to the root of the project and run

```console 
./mvnw clean package
```

If you want to skip the tests

```console 
./mvnw clean package -DskipTests
```

## Run the backend

### Pre-requisites

* `docker` installed (see [docker installation documentation](https://docs.docker.com/engine/install/) for details on how to install it)
* `docker-compose` installed (see [docker-compose installation documentation](https://docs.docker.com/compose/install/other/) for details on how to install it)


### Increase vm.max_map_count

This step is needed in order to properly run the Elastcsearch containerm run:

```
sudo sh -c 'echo 'vm.max_map_count=262144' > /etc/sysctl.conf'
sudo sysctl -p
```

Then run `sudo sysctl -p`


### Spawn the required containers

Go to the root of the project and run

```console
docker-compose --profile local up -d --build
```

The previous command will launch all the required containers in the background and build the images if needed.
It will not start the application though, just the dependencies.


### Launch the server

Go to the root of the project and run
    
```console
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```


# Swagger UI

Once the project is up and running you can access the swagger ui at:

http://localhost:8080/swagger-ui.html#/


## Compile the frontend

### Prerequisites

* nodejs version >= 16 (see [nodejs installation documentation](https://nodejs.org/en/download/) if you are  interested in further installation details)

The easiest way to install nodejs is to use nvm (node version manager) which can be installed with

```console
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Once nvm is installed you can install nodejs with

```console
nvm install 16
```

Once you have nodejs installed you can install angular-cli with

```console
npm install -g @angular/cli@11.2.3
```

Go to src/main/toodaifrontend and run

```console
npm run build
```

## Run the frontend

Go to src/main/toodaifrontend and run

```console
npm run start
```