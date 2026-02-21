#!/bin/bash

docker-compose up -d --build mysql
docker-compose up -d --build laravel
docker-compose exec laravel php artisan migrate
docker-compose up
