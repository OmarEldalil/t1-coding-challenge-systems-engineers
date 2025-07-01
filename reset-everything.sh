#!/bin/bash

# This script resets the Kafka topics, consumer groups, Redis database, and MongoDB database for the T1 Coding Challenge environment.
# only for development purposes, use with caution!

docker exec t1-coding-challenge-kafka kafka-topics --bootstrap-server kafka:9092 --delete --topic market-transformed
docker exec t1-coding-challenge-kafka kafka-topics --bootstrap-server kafka:9092 --delete --topic market
docker exec t1-coding-challenge-kafka kafka-topics --bootstrap-server kafka:9092 --delete --topic trades

docker exec t1-coding-challenge-kafka kafka-consumer-groups --bootstrap-server kafka:9092 --delete --group market-consumer-group
docker exec t1-coding-challenge-kafka kafka-consumer-groups --bootstrap-server kafka:9092 --delete --group market-transformed-consumer-group
docker exec t1-coding-challenge-kafka kafka-consumer-groups --bootstrap-server kafka:9092 --delete --group trades-consumer-group

docker exec t1-coding-challenge-redis redis-cli FLUSHALL
docker exec t1-coding-challenge-database mongo --eval "db.getSiblingDB('t1-coding-challenge').dropDatabase()"

docker exec -it t1-coding-challenge-kafka kafka-topics --create --topic market-transformed --bootstrap-server kafka:9092 --replication-factor 1 --partitions 3
docker exec -it t1-coding-challenge-kafka kafka-topics --create --topic market --bootstrap-server kafka:9092 --replication-factor 1 --partitions 3
docker exec -it t1-coding-challenge-kafka kafka-topics --create --topic trades --bootstrap-server kafka:9092 --replication-factor 1 --partitions 12