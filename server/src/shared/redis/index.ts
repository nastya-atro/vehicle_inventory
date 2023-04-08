import Redis from "ioredis";

/**
 * Get cache client
 * @returns cache client
 */
export function getCacheClient() {
  const clusterMode =
    process.env.REDIS_CLUSTER_MODE && process.env.REDIS_CLUSTER_MODE === "true";
  const redisUserName = process.env.REDIS_USERNAME;
  const redisPassword = process.env.REDIS_PASSWORD;
  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;
  const redisKeyPrefix = process.env.REDIS_KEY_PREFIX || "";
  const redisConnectionString = process.env.REDIS_CONNECTION_STRING;
  if (!redisConnectionString) {
    throw new Error(`Redis connection string not found`);
  }
  const servers = redisConnectionStringParse(redisConnectionString);
  if (servers && servers.length >= 1) {
    if (clusterMode) {
      return new Redis.Cluster(servers, {
        redisOptions: {
          username: redisUserName,
          password: redisPassword,
          keyPrefix: redisKeyPrefix,
        },
      });
    } else {
      return new Redis({
        host: servers[0].host,
        port: servers[0].port,
        username: redisUserName,
        password: redisPassword,
        keyPrefix: redisKeyPrefix,
      });
    }
  }
  throw new Error("Invalid redis configuration");
}

/**
 * !!! cluster mode has problems, before using need re-check
 * @returns cache options
 */
export function getTypeORMClientOptions(): boolean | any {
  const clusterMode =
    process.env.REDIS_CLUSTER_MODE && process.env.REDIS_CLUSTER_MODE === "true";
  const redisPassword = process.env.REDIS_PASSWORD;
  const redisKeyPrefix = process.env.REDIS_KEY_PREFIX || "";
  const redisConnectionString = process.env.REDIS_CONNECTION_STRING;

  if (!redisConnectionString) {
    return false;
  }

  const servers = redisConnectionStringParse(redisConnectionString);
  if (servers && servers.length > 1) {
    if (clusterMode) {
      return {
        type: "ioredis/cluster",
        options: {
          startupNodes: servers,
          options: {
            password: redisPassword,
            prefix: redisKeyPrefix,
          },
        },
      };
    } else {
      return {
        type: "ioredis",
        options: {
          host: servers[0].host,
          port: servers[0].port,
          password: redisPassword,
          prefix: redisKeyPrefix,
        },
      };
    }
  }
}

export function redisConnectionStringParse(connectionString: string) {
  if (!connectionString) {
    throw new Error(`Invalid redis connection string`);
  }
  const servers = connectionString.split(`,`);
  const result = [];
  for (const server of servers) {
    if (server) {
      const items = server.split(`:`);
      if (items.length !== 2) {
        throw new Error(
          `Invalid redis connection string. Can not split '${items}'`
        );
      }
      if (items[0] && items[1]) {
        result.push({
          host: items[0],
          port: parseInt(items[1], 10),
        });
      }
    }
  }
  return result;
}
