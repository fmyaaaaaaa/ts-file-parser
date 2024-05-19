export enum ErrorCode {
  ARGS_NOT_VALID = 1000,
  FILE_NOT_FOUND = 1001,
  NO_SYNC_BYTE_PRESENT = 1002,
  FAIL_TO_CONVERT_NUMBER_TO_HEX = 1003,
  FILE_EXTENSION_IS_NOT_ACCEPTABLE = 1004,
  FILE_CONTAINS_SOME_PROBLEMS = 1005,
}

export const ErrorContents = {
  1000: {
    code: ErrorCode.ARGS_NOT_VALID,
    name: 'ArgsNotValidError',
  },
  1001: {
    code: ErrorCode.FILE_NOT_FOUND,
    name: 'FileNotFoundError',
  },
  1002: {
    code: ErrorCode.NO_SYNC_BYTE_PRESENT,
    name: 'NoSyncBytePresentError',
  },
  1003: {
    code: ErrorCode.FAIL_TO_CONVERT_NUMBER_TO_HEX,
    name: 'FailToConvertNumberToHexError',
  },
  1004: {
    code: ErrorCode.FILE_EXTENSION_IS_NOT_ACCEPTABLE,
    name: 'FileExtensionIsNotAcceptableError',
  },
  1005: {
    code: ErrorCode.FILE_CONTAINS_SOME_PROBLEMS,
    name: 'FileContainsSomeProblemsError',
  },
};
