import {tradesConsumer} from "./trades/consumer";
import { marketConsumer } from "./market/consumer";
import {marketTransformedConsumer} from "./market-transformed/consumer";
export const getConsumers = () => {
    return {
        tradesConsumer,
        marketConsumer,
        marketTransformedConsumer
    }
}