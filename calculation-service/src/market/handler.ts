import {marketProducer} from "./producer";
import Kafka from "node-rdkafka";
import {MARKET_TRANSFORMED_TOPIC, TRANSFORMATION_DELAY_MS} from "../config";

export const handleMarketMessage = (data: Kafka.Message) => {
    console.log(`Received market message: ${data.value ? data.value.toString() : 'null'}`);
    setTimeout(() => {
        marketProducer.produce(MARKET_TRANSFORMED_TOPIC, null, data.value, null, Date.now());
    }, TRANSFORMATION_DELAY_MS);
}