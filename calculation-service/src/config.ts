export const KAFKA_BROKER_URL = process.env.KAFKA_BROKER_URL || 'kafka:9092';
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://database:27017/t1-coding-challenge';
export const MONGODB_PNL_COLLECTION_NAME = process.env.MONGODB_PNL_COLLECTION_NAME || 'pnl';
export const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';

export const TRADES_TOPIC = process.env.TRADES_TOPIC || 'trades';
export const MARKET_TOPIC = process.env.MARKET_TOPIC || 'market';
export const MARKET_TRANSFORMED_TOPIC = process.env.MARKET_TRANSFORMED_TOPIC || 'market-transformed';

// re-emit market messages after X seconds to ensure trades are processed first, assuming that market window comes every 3 seconds so that would be enough
export const TRANSFORMATION_DELAY_MS = +(process.env.TRANSFORMATION_DELAY_MS || 3000);