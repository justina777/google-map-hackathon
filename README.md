# Google map hackathon

## Prerequisites
1. [Docker](https://docs.docker.com/get-docker/)
2. [Node.js](https://nodejs.org/en/download/)  
3. Git

## Running the Web Application
1. Clone the source code from the following GitHub repository
```
$ npm run build 
```
2. Build the web application into a Docker image
```
$ docker build --rm -t web-co2-emission -f app.Dockerfile .
```

3. Run the web application by Docker
```
$ docker run --rm -it -p 3000:3000 web-co2-emission
```

4. Browse the website on your local machine by Chrome
```
http://localhost:3000
```

5. Stop the web application by find the running container
```
$ docker ps 
```
6. Stop the running container
```
$ docker stop <your_container_id>
```


## Reference
