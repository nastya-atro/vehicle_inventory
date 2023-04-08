import * as crypto from "crypto";

/**
 * Generate password salt
 * @param size
 */
export function generateSalt(size = 8) {
  return crypto.randomBytes(size).toString("hex");
}

/**
 * Options structure
 */
interface GeneratePasswordHashOptions {
  iteration: number;
  keylen: number;
  digest: string;
}

/**
 * Default options for GeneratePasswordHash fn
 */
const defaultOptions: GeneratePasswordHashOptions = {
  iteration: 100000,
  keylen: 32,
  digest: "sha512",
};

/**
 * Salt-based password generation
 * @param password
 * @param salt
 * @param options
 */
export function generatePasswordHash(
  password: string,
  salt: string,
  options = defaultOptions
) {
  const { iteration, keylen, digest } = options;
  return crypto
    .pbkdf2Sync(password, salt, iteration, keylen, digest)
    .toString("hex");
}

/**
 * Generation token
 * @param algorithm
 * @param data
 */
export function generateTokenHash(algorithm: string, data: any) {
  return crypto.createHash(algorithm).update(data).digest("hex");
}
