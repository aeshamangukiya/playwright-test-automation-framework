import { ENV } from '../config/env';
import { UserRole } from '../constants/roles';

export const users = {
  [UserRole.USER]: ENV.USERS.USER,
  [UserRole.ADMIN]: ENV.USERS.ADMIN
};
