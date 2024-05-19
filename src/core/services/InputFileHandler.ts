import { checkFileExtensionTS } from '../utils/AppValidation';
import * as fs from 'fs';
import AppException from '../models/AppException';
import { ErrorCode } from '../error/ErrorCode';
import { LAST_FIVE_BITS, MOVE_DIGIT, PACKET_SIZE, SYNC_BYTE } from '../utils/AppConstants';

/**
 * Check if there is a file in the filePath.
 * @param filePath File path
 */
export async function checkFileExist(filePath: string): Promise<boolean> {
  checkFileExtensionTS(filePath);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      resolve(true);
    } else {
      reject(new AppException(ErrorCode.FILE_NOT_FOUND, 'Error: File does not exist'));
    }
  });
}

/**
 * This function returns unique PID list as hex values.
 * While processing the input data, validate the data if it is valid MPEG file or not
 * @param stream Input file stream
 */
export async function parseTSInputFileToPID(stream: fs.ReadStream): Promise<number[]> {
  const pids: number[] = [];
  let packetIndex = 0;

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => {
      if (chunk[0] === SYNC_BYTE) {
        // @ts-ignore If assert the chunk[1] ~ [2] as number, the value shifted unintentionally
        const pid = (((chunk[1] & LAST_FIVE_BITS) << MOVE_DIGIT) | chunk[2]);
        pids.push(pid);
        packetIndex++;
      } else {
        stream.destroy();
        const errorMessage = `Error: No sync byte present in packet ${packetIndex}, offset ${packetIndex * PACKET_SIZE}`;
        reject(new AppException(ErrorCode.NO_SYNC_BYTE_PRESENT, errorMessage));
        return;
      }
    });

    stream.on('error', () => {
      stream.destroy();
      reject(new AppException(ErrorCode.FILE_CONTAINS_SOME_PROBLEMS, 'Error: Uploaded file contains problems'));
      return;
    });

    stream.on('end', () => {
      stream.destroy();
      resolve(pids);
      return;
    });
  });
}
