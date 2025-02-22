import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-Response time');

    res.on('finish', () => console.timeEnd('Request-Response time'));
    next();
  }
}
