#!/bin/bash

docker-compose up --build  -d
sleep 1
docker exec -it laravel-react-docker-crm_laravel_1 php artisan migrate