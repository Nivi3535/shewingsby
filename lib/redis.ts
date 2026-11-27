import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis: Redis | undefined };

const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: 1, // don't hang for ages if Redis is down
  });

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

export default redis;
