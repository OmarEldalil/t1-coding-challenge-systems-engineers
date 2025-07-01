export const KAFKA_BROKER_URL = process.env.KAFKA_BROKER_URL || 'kafka:9092';
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://database:27017/t1-coding-challenge';
export const MONGODB_PNL_COLLECTION_NAME = process.env.MONGODB_PNL_COLLECTION_NAME || 'pnl';
export const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';

export const TRADES_TOPIC = process.env.TRADES_TOPIC || 'trades';

export const MAX_PNL_RECORDS_TO_RETURN = +(process.env.MAX_PNL_RECORDS_TO_RETURN || 10);

export const CACHED_PNLS_TTL_SECONDS = +(process.env.CACHED_PNLS_TTL_SECONDS || 5);