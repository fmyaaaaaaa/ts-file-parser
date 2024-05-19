import { Body, Controller, Get, Post, Request, Route, SuccessResponse, UploadedFile } from 'tsoa';
import { TSFileService } from '../service/TSFileService';
import AppException from '../../core/models/AppException';
import { TSFileValidationResponse } from '../model/TSFileValidationResponse';
import { TSFileUploadRequest } from '../model/TSFileUploadRequest';

@Route('tsfile')
export class TSFileController extends Controller {

  private readonly service: TSFileService = new TSFileService();

  @Post('/validation')
  public async complete(@Body() body: TSFileUploadRequest): Promise<TSFileValidationResponse> {
    try {
      await this.service.validation(body.fileName);
      return new TSFileValidationResponse(true);
    } catch (e) {
      if (e instanceof AppException) {
        return new TSFileValidationResponse(false, e.errorCode, e.message);
      } else {
        return new TSFileValidationResponse(false);
      }
    }
  }
}
