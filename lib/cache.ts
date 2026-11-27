import redis from "@/lib/redis";

// Get from Redis, or run `loader`, save the result, and return it.
export async function getOrSet<T>(
  key: string,
  ttlSeconds: number,
  tags: string[],
  loader: () => Promise<T>,
): Promise<T> {
  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log("CACHE HIT", key);
      return JSON.parse(cached) as T;
    }
  } catch (error) {
    console.error("Redis read failed, using database", error); // Redis down -> still works
  }

  console.log("CACHE MISS", key);
  const data = await loader();

  try {
    await redis.set(key, JSON.stringify(data), "EX", ttlSeconds); // EX = expire after N seconds
    for (const tag of tags) {
      await redis.sadd(`tag:${tag}`, key); // remember: this key belongs to this tag
    }
  } catch (error) {
    console.error("Redis write failed", error);
  }

  return data;
}

// Delete every key that has this tag (your own revalidateTag)
export async function invalidateTag(tag: string) {
  try {
    const keys = await redis.smembers(`tag:${tag}`);
    if (keys.length > 0) await redis.del(...keys);
    await redis.del(`tag:${tag}`);
  } catch (error) {
    console.error("Redis invalidate failed", error);
  }
}
