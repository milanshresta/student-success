import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const body = isHttpException
      ? exception.getResponse()
      : { message: 'Internal server error' };

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      ...(typeof body === 'string' ? { message: body } : body),
    });
  }
}
