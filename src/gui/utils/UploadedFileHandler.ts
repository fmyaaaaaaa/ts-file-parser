import path from 'node:path';
import { appendFile, ensureDir, ensureFile, move, readdir, readFile, remove } from 'fs-extra';

export const saveChunkFiles = async (fileName: string, chunkNumber: string, chunkFile: Express.Multer.File) => {
  const chunksDir = path.join(__dirname, 'uploads', 'chunks', fileName);
  await ensureDir(chunksDir);
  const chunkPath = path.join(chunksDir, `${chunkNumber.padStart(4, '0')}-${chunkFile.filename}`);
  await move(chunkFile.path, chunkPath);
};

export const compileChunks = async (fileName: string): Promise<string> => {
  const chunksDir = path.join(__dirname, 'uploads', 'chunks', fileName);
  const finalFilePath = path.join(__dirname, 'uploads', fileName);
  const chunkFiles = await readdir(chunksDir);
  await ensureFile(finalFilePath);
  for (const chunkFile of chunkFiles.sort()) {
    const chunkFilePath = path.join(chunksDir, chunkFile);
    await appendFile(finalFilePath, await readFile(chunkFilePath));
    await remove(chunkFilePath);
  }
  await remove(chunksDir);
  return finalFilePath;
};
