#!/bin/bash

# Remove the previous Docker image (if exists)
docker image rm -f personal_saas_server_personal_server:latest

# Build the new Docker image
docker-compose build

# Start the Docker containers
docker-compose up -d