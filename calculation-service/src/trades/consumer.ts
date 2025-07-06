import {registerConsumer} from "../utils/register-consumer";
import {TRADES_TOPIC} from "../config";
import {handleTradeMessage} from "../trades/handler";

export const tradesConsumer = registerConsumer({
    consumerGroupId: 'trade-consumer-group',
    topics: [TRADES_TOPIC],
    onData: handleTradeMessage,
})
