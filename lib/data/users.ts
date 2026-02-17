import { ENV } from '../../config/env';
import { USER_ROLES } from './constants/roles';

export const USERS = {
    [USER_ROLES.USER]: ENV.USERS.USER,
    [USER_ROLES.ADMIN]: ENV.USERS.ADMIN,
};
