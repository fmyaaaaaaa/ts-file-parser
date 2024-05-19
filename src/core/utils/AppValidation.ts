import path from 'node:path';
import AppException from '../models/AppException';
import { ErrorCode } from '../error/ErrorCode';

/**
 * Check the args length is proper or not
 * @param args Args from input
 */
export const checkArgLength = (args: string[]) => {
  if (args.length !== 3) {
    throw new AppException(ErrorCode.ARGS_NOT_VALID, 'Error: Please pass your valid file path');
  }
};

/**
 * Check if a file extension is .ts
 * Throw AppException if it is not.
 * @param filePath File path
 */
export const checkFileExtensionTS = (filePath: string) => {
  const extension = path.extname(filePath);
  if (extension.toLowerCase() !== '.ts') {
    throw new AppException(ErrorCode.FILE_EXTENSION_IS_NOT_ACCEPTABLE, 'Error: File extension must be .ts');
  }
};
