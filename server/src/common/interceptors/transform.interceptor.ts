import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '../logger/logger.service';
import { response } from '../utils/http.utils';

export interface Response {
  payload: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response> {
  constructor(
    private readonly reflector: Reflector,
    private logger: LoggerService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((payload) => {
        // HACK: set custom status code
        if (payload?.statusCode) {
          res.status(payload.statusCode);
          delete payload.statusCode;
        }
        if (process.env.APP_LOGGER_INFO) {
          this.logger.info(payload);
        }

        return response.ok({ payload: instanceToPlain(payload) });
      }),
    );
  }
}
