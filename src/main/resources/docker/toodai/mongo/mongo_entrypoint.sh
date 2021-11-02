#!/bin/bash

chmod 600 /data/scripts/mongo-keyfile
chown 999:999 /data/scripts/mongo-keyfile
mongod --port 27017 --replSet toodaiReplicaSet --keyFile /data/scripts/mongo-keyfile