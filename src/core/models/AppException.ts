import { ErrorCode, ErrorContents } from '../error/ErrorCode';

/**
 * Application custom exception. This class can handle error code and error messages based on ErrorCode.ts file.
 * Please throw this Exception as much as possible if you handle some errors intentionally.
 */
export default class AppException extends Error {
  errorCode: ErrorCode;

  errorName: string;

  constructor(code: ErrorCode, message: string) {
    super(message);
    const { name } = ErrorContents[code];
    this.errorCode = code;
    this.errorName = name;
    this.name = name;
  }
}
