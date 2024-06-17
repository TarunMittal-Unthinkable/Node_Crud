import redis from 'redis';
const client = redis.createClient(process.env.REDIS_PORT);


export default client;