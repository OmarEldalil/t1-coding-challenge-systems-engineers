// the actual calculation happens in the market-transformed consumer
import {registerConsumer} from "../utils/register-consumer";
import {MARKET_TRANSFORMED_TOPIC} from "../config";
import {handleMarketTransformedMessage} from "../market-transformed/handler";

export const marketTransformedConsumer = registerConsumer({
    consumerGroupId: 'market-transformed-consumer-group',
    topics: [MARKET_TRANSFORMED_TOPIC],
    onData: handleMarketTransformedMessage,
    enableAutoCommit: false
})