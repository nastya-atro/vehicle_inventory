import * as winston from 'winston';
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private logger: winston.Logger;

  constructor(public context: string = 'APP') {
    super();
    this.logger = winston.createLogger({
      transports: this.getConsoleTransport(),
    });
  }

  error(message: any, stack?: any) {
    this.logger.log('error', this.setMessageContext(message, stack));
  }

  info(message: any) {
    this.logger.log('info', this.setMessageContext(message));
  }

  private setMessageContext(message: string | object, stack?: any) {
    const requestId = uuid.v1();
    if (typeof message === 'string') {
      return {
        message,
        requestId,
        context: this.context,
        stack,
      };
    }
    return {
      ...message,
      stack,
      requestId,
      context: this.context,
    };
  }

  private getConsoleTransport() {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.printf((info) => {
          const { timestamp, context, requestId, level, stack, ...data } = info;

          return `[${timestamp}] [${context}] [${requestId || ''}] ${level.toUpperCase()} ${
            data.message || JSON.stringify(data)
          } \n${stack || ''}`;
        })
      ),
    });
  }
}
