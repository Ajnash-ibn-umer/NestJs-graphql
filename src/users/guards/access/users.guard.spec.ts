import { JwtService } from '@nestjs/jwt';
import { UsersGuard } from './users.guard';

describe('UsersGuard', () => {
  it('should be defined', () => {
    expect(new UsersGuard()).toBeDefined();
  });
});
