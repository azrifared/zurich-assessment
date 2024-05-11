import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(error) {
    super(error, HttpStatus.FORBIDDEN);
  }
}

export class BadRequestException extends HttpException {
  constructor(error) {
    super(error, HttpStatus.BAD_REQUEST);
  }
}
