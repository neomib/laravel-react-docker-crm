#!/bin/bash

docker-compose up --build  -d
docker exec -it laravel-react-docker-crm_laravel_1 php artisan migrate
docker-compose up nginx