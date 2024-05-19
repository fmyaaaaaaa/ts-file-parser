import { checkFileExist, parseTSInputFileToPID } from '../core/services/InputFileHandler';
import AppException from '../core/models/AppException';
import * as fs from 'fs';
import { PACKET_SIZE } from '../core/utils/AppConstants';
import { convertToHexArray } from '../core/utils/AppUtil';
import { checkArgLength } from '../core/utils/AppValidation';

export default (args: string[]) => {
  try {
    checkArgLength(args);
  } catch (error) {
    if (error instanceof AppException) {
      console.log(error.message);
    }
    process.exit(1);
  }

  const filePath = args[2];
  checkFileExist(filePath).catch(error => {
    if (error instanceof AppException) {
      console.log(error.message);
    }
    process.exit(1);
  });

  const stream = fs.createReadStream(filePath, { highWaterMark: PACKET_SIZE });
  parseTSInputFileToPID(stream).then(pids => {
    const sorted = pids.sort();
    const unique = Array.from(new Set(sorted));
    const result = convertToHexArray(unique);
    result.forEach(r => console.log(r));
  }).catch(error => {
    if (error instanceof AppException) {
      console.log(error.message);
      process.exit(1);
    }
  });
};