import Kafka from "node-rdkafka";
import {convertDateStringToTimestamp} from "../utils/helpers";
import {deleteTrades, getTradesSum,} from "../trades/db-layer";
import {storePnl} from "./db-layer";
import {marketTransformedConsumer} from "../market-transformed/consumer";

export const handleMarketTransformedMessage = async (data: Kafka.Message) => {
    console.log(`Received transformed market message: ${data.value ? data.value.toString() : 'null'}`);
    if (!data.value) {
        throw new Error('Invalid message');
    }

    const message = JSON.parse(data.value.toString());
    if (message.messageType !== 'market') {
        return;
    }

    try {

        const [buyVolume, sellVolume] = await Promise.all([
            getTradesSum('BUY', convertDateStringToTimestamp(message.startTime), convertDateStringToTimestamp(message.endTime)),
            getTradesSum('SELL', convertDateStringToTimestamp(message.startTime), convertDateStringToTimestamp(message.endTime))
        ])
        const pnl = +(sellVolume * message.sellPrice - buyVolume * message.buyPrice).toFixed(3);

        await storePnl({pnl, ...message, buyVolume, sellVolume});

        deleteTrades('BUY', convertDateStringToTimestamp(message.startTime), convertDateStringToTimestamp(message.endTime))
        deleteTrades('SELL', convertDateStringToTimestamp(message.startTime), convertDateStringToTimestamp(message.endTime))

        marketTransformedConsumer.commit(data);

    } catch (e) {
        console.error(`Error processing market message: ${e}`);
        throw e; // Re-throw the error to ensure it is logged by the consumer
    }
}