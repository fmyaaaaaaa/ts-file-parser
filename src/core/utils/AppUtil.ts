import AppException from '../models/AppException';
import { ErrorCode } from '../error/ErrorCode';

/**
 * Convert number value to hex string value.
 * This function allows you to convert hex value without sign from number.
 * Acceptable number range is: 0 = 65,535
 * @param number Target number
 */
export function convertNumberToHexValue(number: number): string {
  if (number < 0 || 65535 < number) {
    throw new AppException(ErrorCode.FAIL_TO_CONVERT_NUMBER_TO_HEX, 'Error: Number must be between 0 and 65,535');
  }
  return `0x${number.toString(16)}`;
}

/**
 * Convert number value array to hex string value array
 * @param numbers Target number list
 */
export function convertToHexArray(numbers: number[]): string[] {
  return numbers.map(n => convertNumberToHexValue(n));
}
