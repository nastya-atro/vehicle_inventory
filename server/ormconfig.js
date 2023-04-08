// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const envFile = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : ".env.development";
const baseDir = path.join(__dirname, "/env");
const envPath = path.resolve(baseDir, `${envFile}`);

dotenv.config({ path: envPath });

module.exports = [
  {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    logging: process.env.TYPEORM_LOGGING,
  },
];
