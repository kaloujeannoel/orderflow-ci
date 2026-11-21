import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Limiteur basé sur l'IP (pour contrer les attaques distribuées)
export const ipRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "15 m"), // 10 tentatives par IP toutes les 15 min
  analytics: true,
});

// Limiteur basé sur l'email (pour contrer les attaques ciblées)
export const accountRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(5, "15 m"), // 5 tentatives par email toutes les 15 min
});