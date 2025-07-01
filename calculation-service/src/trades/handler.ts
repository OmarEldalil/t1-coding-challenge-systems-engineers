import Kafka from "node-rdkafka";
import {convertDateStringToTimestamp} from "../utils/helpers";
import {storeTrade} from "../trades/db-layer";

export const handleTradeMessage = (data: Kafka.Message) => {
    console.log(`trade: ${data.value ? data.value.toString() : 'null'}`);
    if (!data.value) {
        throw new Error('Invalid message');
    }

    const message = JSON.parse(data.value.toString());
    if (message.messageType !== 'trades') {
        return;
    }

    storeTrade({
        type: message.tradeType,
        time: convertDateStringToTimestamp(message.time),
        volume: message.volume
    })
}