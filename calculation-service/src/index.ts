// YOUR CODE HERE
import {connectToRedis} from "./lib/redis";
import {connectToMongodb} from "./lib/mongodb";
import {registerConsumer} from "./utils/register-consumer";
import {handleTradeMessage} from "./trades/handler";
import {handleMarketMessage} from "./market/handler";
import {MARKET_TOPIC, MARKET_TRANSFORMED_TOPIC, TRADES_TOPIC} from "./config";
import {handleMarketTransformedMessage} from "./market-transformed/handler";

async function main() {

    try {
        await connectToRedis();
        await connectToMongodb();

        const tradesConsumer = registerConsumer({
            consumerGroupId: 'trade-consumer-group',
            topics: [TRADES_TOPIC],
            onData: handleTradeMessage,
        })

        // introducing a reasonable delay to ensure the trades messages within start and end times are processed starting the market consumer
        const marketConsumer = registerConsumer({
            consumerGroupId: 'market-consumer-group',
            topics: [MARKET_TOPIC],
            onData: handleMarketMessage
        })

        // the actual calculation happens in the market-transformed consumer
        const marketTransformedConsumer = registerConsumer({
            consumerGroupId: 'market-transformed-consumer-group',
            topics: [MARKET_TRANSFORMED_TOPIC],
            onData: handleMarketTransformedMessage
        })

        const gracefulShutdown = () => {
            tradesConsumer.unsubscribe();
            marketConsumer.unsubscribe();
            marketTransformedConsumer.unsubscribe();
            tradesConsumer.disconnect();
            marketConsumer.disconnect();
            marketTransformedConsumer.disconnect();
            console.log('Kafka consumers disconnected');
            process.exit(0);
        }
        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGQUIT', gracefulShutdown);

    } catch (e) {
        console.error('Error in main function:', e);
    }
}

main()