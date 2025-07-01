import {redisClient} from "../lib/redis";

export const storeTrade = (trade: { type: "BUY" | "SELL", time: number, volume: number }) => {
    redisClient?.ts.add(`trades:${trade.type}`, trade.time, trade.volume, {
        RETENTION: 1000 * 60 * 60, // 60 minutes retention; just any reasonable value in order to flood the Redis with data
        LABELS: {
            'type': trade.type,
        },
        ON_DUPLICATE: 'FIRST'
    });
}

export const getTradesSum = async (type: "BUY" | "SELL", from: number, to: number) => {

    const result = await redisClient?.ts.range(`trades:${type}`, from, to, {
        AGGREGATION: {
            type: 'SUM',
            timeBucket: to - from + 1
        },
        ALIGN: 'start',
    });

    if (typeof result === 'undefined' || !result || result.length === 0) {
        return 0;
    }

    const value = result[0]!.value;

    return +value.toFixed(3);
}

export const deleteTrades = (type: "BUY" | "SELL", from: number, to: number) => {
    redisClient?.ts.del(`trades:${type}`, from, to);
}