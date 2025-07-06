// YOUR CODE HERE
import {connectToRedis} from "./lib/redis";
import {connectToMongodb} from "./lib/mongodb";
import {getConsumers} from "./get-consumers";

async function main() {

    try {
        await connectToRedis();
        await connectToMongodb();

        const { tradesConsumer, marketConsumer, marketTransformedConsumer } = getConsumers();

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