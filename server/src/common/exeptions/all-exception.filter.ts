import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { MESSAGES } from '@nestjs/core/constants';
import { response } from '../utils/http.utils';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  constructor(adapterHost: HttpAdapterHost, private logger: LoggerService) {
    super(adapterHost.httpAdapter);
  }

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    let message = exception.message;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      message =
        (exception.getResponse() as any).message ||
        MESSAGES.UNKNOWN_EXCEPTION_MESSAGE;
      status = exception.getStatus();
    }
    const body = { message, errorCode: status };

    if (process.env.APP_LOGGER_ERROR) {
      this.logger.error(message, exception.stack);
    }
    ctx.getResponse().status(status).json(response.error(body));
  }
}
