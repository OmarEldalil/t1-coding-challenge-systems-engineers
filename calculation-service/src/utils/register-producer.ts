import Kafka from "node-rdkafka";
import {KAFKA_BROKER_URL} from "../config";

export const registerProducer = (): Kafka.Producer => {
    const producer = new Kafka.Producer({
        'metadata.broker.list': KAFKA_BROKER_URL,
    });

    producer.connect({}, (err, metaData) => {
        if (err) {
            console.error(`Error connecting to Kafka: ${err}`);
            return;
        }
    });

    producer.on('ready', () => {
        console.log('producer is ready');
    });

    producer.on('event.error', (err) => {
        console.error('Kafka producer error:', err);
    });

    return producer;
}
