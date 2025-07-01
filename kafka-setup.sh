kafka-topics --create --topic trades --bootstrap-server kafka:9092 --replication-factor 1 --partitions 12
kafka-topics --create --topic market --bootstrap-server kafka:9092 --replication-factor 1 --partitions 3
kafka-topics --create --topic market-transformed --bootstrap-server kafka:9092 --replication-factor 1 --partitions 3
