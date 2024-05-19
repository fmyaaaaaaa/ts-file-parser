import { remove } from 'fs-extra';
import fs from 'fs';
import { PACKET_SIZE } from '../../core/utils/AppConstants';
import { parseTSInputFileToPID } from '../../core/services/InputFileHandler';
import { compileChunks } from '../utils/UploadedFileHandler';

export class TSFileService {

  public async validation(fileName: string): Promise<Boolean> {
    const filePath = await compileChunks(fileName);
    try {
      const stream = fs.createReadStream(filePath, { highWaterMark: PACKET_SIZE });
      const result = await parseTSInputFileToPID(stream);
      if (result.length > 0) return true;
    } catch (e) {
      throw e;
    } finally {
      await remove(filePath);
    }
    return true;
  }
}
