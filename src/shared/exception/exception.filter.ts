import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Error as MongooseError } from 'mongoose';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let error: any = {
      message: 'No error provided',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
    if (exception instanceof HttpException) {
      error = exception.getResponse();
    } else if (exception?.name === 'MongoError') {
      if (exception?.code === 11000) {
        error.message = exception.message;
        error.statusCode = exception.statusCode;
      } else {
        error.message = exception.message;
      }
    } else if (exception instanceof MongooseError) {
      error.message = exception.message;
    }
    this.logger.debug(exception);
    response.status(error.statusCode).json({
      ...error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
