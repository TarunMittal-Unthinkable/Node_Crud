import errors from "../lib/errors.js";
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import appConstants from '../constant/constant.js';
import client from '../lib/redisClient.js'

// Rate-Limiter without Redis 
const apiRequestLimiter = rateLimit({
    windowMs: appConstants.RATE_LIMIT.TIME_WINDOW_MS,
    limit: appConstants.RATE_LIMIT.MAX_ATTEMPTS,
    handler: () => { throw errors.TO_MANY_REQUEST() }
})

// Rate-Limiter with Redis 
const apiLimiter = rateLimit({
    windowMs: appConstants.RATE_LIMIT.TIME_WINDOW_MS,
    limit: appConstants.RATE_LIMIT.MAX_ATTEMPTS,
    keyGenerator: (req) => `${req.method}-${req.url}`,
    handler: () => { throw errors.TO_MANY_REQUEST() },
    store: new RedisStore({
		sendCommand: (...args) => client.sendCommand(args),
	}),
  });

export {apiRequestLimiter,apiLimiter}