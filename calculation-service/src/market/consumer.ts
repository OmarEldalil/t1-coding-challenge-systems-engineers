// introducing a reasonable delay to ensure the trades messages within start and end times are processed starting the market consumer
import {registerConsumer} from "../utils/register-consumer";
import {MARKET_TOPIC} from "../config";
import {handleMarketMessage} from "../market/handler";

export const marketConsumer = registerConsumer({
    consumerGroupId: 'market-consumer-group',
    topics: [MARKET_TOPIC],
    onData: handleMarketMessage,
    enableAutoCommit: false
})