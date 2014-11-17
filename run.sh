#!/bin/sh

echo "** Cleaning"
./clean_containers.sh

echo "** Building"
./build.sh

echo "** Running"
# run redis
sudo docker run -d --name redis redis

# run app
sudo docker run -d -p 3000:3000 --name app \
	--link redis:redis localhost:5000/fanchangyong/hello_docker
