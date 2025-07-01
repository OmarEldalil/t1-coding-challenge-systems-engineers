// YOUR CODE HERE
import {mongodb} from "./lib/mongodb";
import {redisClient} from "./lib/redis";
import {CACHED_PNLS_TTL_SECONDS, MONGODB_PNL_COLLECTION_NAME} from "./config";
import {PnL} from "./types";

export type PnLRecordPlain = {
    pnl: number,
    startTime: number,
    endTime: number,
}

export const getPnLsRecords = async ({count = 10}: { count?: number }) => {
    const collection = mongodb?.collection(MONGODB_PNL_COLLECTION_NAME);
    if (!collection) {
        throw new Error('MongoDB collection not initialized');
    }

    return await collection.find({}).sort({startTimeTimeStamp: -1}).project({
        pnl: 1,
        startTime: 1,
        endTime: 1
    }).limit(count).toArray() as PnLRecordPlain[];
}

export const cachePnLs = async (pnls: PnL[]) => {
    await redisClient?.set('pnls', JSON.stringify(pnls), {
        EX: CACHED_PNLS_TTL_SECONDS,
    });
}
export const restoreCachedPnLs = async (): Promise<PnL[] | null> => {
    const pnls = await redisClient?.get('pnls');

    if (typeof pnls === 'string') {
        return JSON.parse(pnls);
    }
    return null;
}