// db.js
import {Db, MongoClient} from 'mongodb';
import {MONGODB_URL} from "../config";

const client = new MongoClient(MONGODB_URL);

export let mongodb: Db | null = null;

export async function connectToMongodb() {
    await client.connect();
    mongodb = client.db('t1-coding-challenge');
}
