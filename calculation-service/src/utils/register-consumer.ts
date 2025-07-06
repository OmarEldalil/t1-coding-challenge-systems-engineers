import Kafka, {KafkaConsumer} from "node-rdkafka";
import {KAFKA_BROKER_URL} from "../config";

export const registerConsumer = ({consumerGroupId, topics, onData, enableAutoCommit = true}: {
    consumerGroupId: string,
    topics: string[],
    onData: (data: Kafka.Message) => void,
    enableAutoCommit?: boolean
}): KafkaConsumer => {
    const consumer = new Kafka.KafkaConsumer({
        'group.id': consumerGroupId,
        'metadata.broker.list': KAFKA_BROKER_URL,
        "enable.auto.commit": enableAutoCommit,
    }, {
        // Start reading at the earliest message to ensure that if the producer started first and the consumer is started later,
        // it will read all messages from the beginning to increase consistency.
        'auto.offset.reset': 'earliest',
    });

    consumer.connect({}, (err, metaData) => {
        if (err) {
            console.error(`Error ${consumerGroupId} connecting to Kafka: ${err}`);
            return;
        }
        console.log(`${topics.join(', ')} consumer connected to Kafka`, metaData);

    });

    consumer.on('ready', () => {
        console.log(`${topics.join(', ')} consumer is ready`);
        consumer.subscribe(topics);
        consumer.consume();
    });

    consumer.on('data', onData);

    consumer.on('event.error', (err) => {
        console.error(`Kafka ${topics.join(', ')} consumer error:`, err);
    });

    return consumer;
}
