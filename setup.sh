#!/bin/bash

docker-compose up
docker exec -it laravel-react-docker-crm_laravel_1 php artisan migrate