import {marketProducer} from "./producer";
import Kafka from "node-rdkafka";
import {MARKET_TRANSFORMED_TOPIC, TRANSFORMATION_DELAY_MS} from "../config";
import {marketConsumer} from "../market/consumer";

export const handleMarketMessage = (data: Kafka.Message) => {
    console.log(`Received market message: ${data.value ? data.value.toString() : 'null'}`);
    setTimeout(() => {
        marketProducer.produce(MARKET_TRANSFORMED_TOPIC, null, data.value, null, Date.now());
        marketConsumer.commit(data);
    }, TRANSFORMATION_DELAY_MS);
}