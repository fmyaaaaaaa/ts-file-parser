import { convertNumberToHexValue, convertToHexArray } from '../../../src/core/utils/AppUtil';

describe('AppUtil: convertNumberToHexValue', () => {
  it('convert number value to hex value', () => {
    const testNum1 = 100;
    const resultHexNum1 = convertNumberToHexValue(testNum1);

    const testNum2 = 0;
    const resultHexNum2 = convertNumberToHexValue(testNum2);

    const testNum3 = 65535;
    const resultHexNum3 = convertNumberToHexValue(testNum3);

    expect(resultHexNum1).toBe('0x64');
    expect(resultHexNum2).toBe('0x0');
    expect(resultHexNum3).toBe('0xffff');
  });
  it('cannot convert if the passed value exceeds hex value range', () => {
    const minusNum = -1;
    const rangeOverNum = 65536;

    expect(() => convertNumberToHexValue(minusNum)).toThrow('Error: Number must be between 0 and 65,535');
    expect(() => convertNumberToHexValue(rangeOverNum)).toThrow('Error: Number must be between 0 and 65,535');
  });
});

describe('AppUtil: convertToHexArray', () => {
  it('can convert all valid number array to hex value array', () => {
    const numArray = [0, 100, 65535];
    const resultArray = convertToHexArray(numArray);

    expect(resultArray.toString()).toBe(['0x0', '0x64', '0xffff'].toString());
  });
  it('cannot convert if an array contain invalid value', () => {
    const numArray = [0, -234, 100, 65535, 65536];
    expect(() => convertToHexArray(numArray)).toThrow('Error: Number must be between 0 and 65,535');
  });
});