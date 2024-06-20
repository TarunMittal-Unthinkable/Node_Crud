import redis from 'redis';
//const client = redis.createClient(process.env.REDIS_PORT);
const client = redis.createClient(process.env.REDIS_PORT)
  .on('ready', () =>
    console.log(`Redis connected successfully at ${process.env.REDIS_PORT}`),
  )
  .on('end', () => console.log('Redis disconnected'))
  .on('error', (error) => console.log(error))
  .on('reconnecting', () =>
  console.log(`Redis reconnecting at ${process.env.REDIS_PORT}`),
  );

  await client.connect();
  await client.ping();

export default client;