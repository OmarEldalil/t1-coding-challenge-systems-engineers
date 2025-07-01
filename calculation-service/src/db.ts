// YOUR CODE HERE
import {mongodb} from "./lib/mongodb";
import {convertDateStringToTimestamp} from "./utils/helpers";
import {PnLRecord} from "./types";
import {MONGODB_PNL_COLLECTION_NAME} from "./config";

export const storePnl = async (payload: PnLRecord) => {
    const collection = mongodb?.collection(MONGODB_PNL_COLLECTION_NAME);
    if (!collection) {
        throw new Error('MongoDB collection not initialized');
    }

    const result = await collection.insertOne({
        ...payload,
        pnl: payload.pnl,
        startTime: convertDateStringToTimestamp(payload.startTime),
        endTime: convertDateStringToTimestamp(payload.endTime),
    });

    return result.insertedId;
}