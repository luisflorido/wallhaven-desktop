#!/bin/bash

# Build Docker image
docker build -t linux-forge ./

# Run Docker container in the background
container_id=$(docker run -d --name dummy-container linux-forge)

# Copy the file from the container to the host
docker cp $container_id:/app/out ./

# Stop and remove the container
docker stop $container_id
docker rm $container_id
docker image rm linux-forge