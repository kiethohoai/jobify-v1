import { UnAuthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId !== resourceUserId.toString()) {
    throw new UnAuthenticatedError('Not authorized to access this route');
  }
};

export default checkPermissions;
