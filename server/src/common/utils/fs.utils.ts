import * as path from "path";
import { existsSync } from "node:fs";
import { readdir, unlink } from "node:fs/promises";
import { mkdirSync, rmSync, writeFile } from "fs";
import * as crypto from "crypto";

/**
 * Create directory and write file
 * @param id
 * @param file
 * @param globalPath
 * @param localPath
 * @param prefix
 */
export const uploadImage = (
  id: string,
  file: Express.Multer.File,
  globalPath: string,
  localPath: string,
  prefix?: string
): string => {
  const buffer = file.buffer;
  const uploadPath = path.join(globalPath, id);
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }
  const name = `${crypto.randomUUID({ disableEntropyCache: true })}${
    prefix && `-${prefix}`
  }${path.extname(file.originalname)}`;
  writeFile(`${uploadPath}/${name}`, buffer, (err) => {
    if (err) throw err;
  });
  return `/${localPath}/${id}/${name}`;
};

/**
 * Cleaning directories with an optional condition
 * @param pathDir
 * @param hasUnlink
 */
export const cleaningDirectory = async (
  pathDir: string,
  hasUnlink?: (file: string) => boolean
) => {
  if (existsSync(pathDir)) {
    const files = await readdir(pathDir);
    for (const file of files) {
      if (typeof hasUnlink === "function") {
        hasUnlink(file) && (await unlink(path.join(pathDir, file)));
      } else {
        await unlink(path.join(pathDir, file));
      }
    }
  }
};

/**
 * Remove directory after deleting entity
 * @param pathDir
 */
export const removeDirectory = (pathDir: string) => {
  if (existsSync(pathDir)) {
    rmSync(pathDir, { recursive: true, force: true });
  }
};
