import { checkArgLength, checkFileExtensionTS } from '../../../src/core/utils/AppValidation';

describe('AppValidation: checkArgLength', () => {
  it('throw application exception if argument length is not valid', () => {
    expect(() => checkArgLength(['', ''])).toThrow('Error: Please pass your valid file path');
  });
});

describe('AppValidation: checkFileExtensionTS', () => {
  it('does not throw any exception if an extension is .ts', () => {
    const fileExtensionLower = '/static/mpeg/test_success.ts';
    const fileExtensionCapital = '/static/mpeg/test_success.TS';
    checkFileExtensionTS(fileExtensionLower);
    checkFileExtensionTS(fileExtensionCapital);
    expect(true);
  });
  it('throw application exception if an extension is not .ts', () => {
    const fileExtensionWrong = '/static/mpeg/test_success.mpeg';
    expect(() => checkFileExtensionTS(fileExtensionWrong)).toThrow('Error: File extension must be .ts');
  });
});