import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002':
        const status = HttpStatus.CONFLICT;
        response.status(200).json({
          message: message,
          statusCode: status,
        });
        break;

      default:
        // default 500 error
        super.catch(exception, host);
        break;
    }
  }
}