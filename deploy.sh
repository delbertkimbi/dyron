#!/bin/bash

# Build images
docker-compose build backend frontend

# Tag images
docker tag dyron-backend:latest delbertkimbi/dyron-backend:latest
docker tag dyron-frontend:latest delbertkimbi/dyron-frontend:latest

# Push to Docker Hub
docker push delbertkimbi/dyron-frontend:latest
docker push delbertkimbi/dyron-backend:latest

# Deploy
docker-compose down -v
docker-compose up -d 