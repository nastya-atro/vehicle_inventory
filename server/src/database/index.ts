import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const mergeConnectionOptions: any = (
  options: ConnectionOptions
): MysqlConnectionOptions => ({
  ...(options as MysqlConnectionOptions),
  extra: {
    connectionLimit: process.env.TYPEORM_CONNECTION_LIMIT,
  },
  timezone: process.env.MYSQL_TZ || "+00:00",
  cache: false,
  migrations: [__dirname + "/../database/migrations/**{.ts,.js}"],
  entities: [__dirname + "/../common/**/**{.ts,.js}"],
  bigNumberStrings: false,
  // keepConnectionAlive: true,

  // Add support to Geometry Data (Point/coordinates) !!!
  legacySpatialSupport: false,
});

/**
 * Create connection with additional options
 * @type {Promise<Connection>}
 */
const connection = getConnectionOptions().then((options) =>
  createConnection(mergeConnectionOptions(options))
);

export const getConnection = async () => connection;
export const getConnectionManager = async () => (await connection).manager;
