#!/bin/sh


CONTAINERS=`sudo docker ps -aq`

if [ ! -z "$CONTAINERS" ] ; then
	echo "Stopping containers"
	sudo docker stop $CONTAINERS

	echo "Deleting containers"
	sudo docker rm $CONTAINERS
fi
