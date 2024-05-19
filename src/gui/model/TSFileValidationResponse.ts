export class TSFileValidationResponse {
  result: boolean;

  code?: number;

  message?: string;

  constructor(result: boolean, code?: number, message?: string) {
    this.result = result;
    this.code = code;
    this.message = message;
  }
}
