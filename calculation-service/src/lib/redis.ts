import {createClient} from "redis";
import {REDIS_URL} from "../config";

export let redisClient: ReturnType<typeof createClient> | null = null;
export const connectToRedis = async () => {
    redisClient = await createClient({
        url: REDIS_URL
    }).on('error', (err) => {
        console.error('Redis Client Error', err);
    }).connect();
}