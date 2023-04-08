import { LoggerService } from 'src/common/logger/logger.service';
import { Request, Response, NextFunction } from 'express';

export function logger(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const _logger = new LoggerService('HTTP');

  const { ip, method, originalUrl } = request;
  const userAgent = request.get('user-agent') || '';

  if (process.env.APP_LOGGER_REQUEST) {
    _logger.log(`REQUEST ${method} ${originalUrl} - ${userAgent} ${ip}`);
  }

  response.on('finish', () => {
    const { statusCode } = response;
    const contentLength = response.get('content-length');
    if (process.env.APP_LOGGER_RESPONSE) {
      if (statusCode >= 500) {
        _logger.error(
          `RESPONSE ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      } else {
        _logger.log(
          `RESPONSE ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      }
    }
  });

  response.on('error', (err) => {
    const { statusCode } = response;
    const contentLength = response.get('content-length');
    if (process.env.APP_LOGGER_RESPONSE) {
      _logger.error({
        message: `RESPONSE ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        stack: err.stack,
      });
    }
  });

  next();
}
