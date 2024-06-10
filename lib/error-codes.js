
export default {
  INTERNAL: {
    code: 'INTERNAL',
    status: 500,
    message: 'Internal server error.',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    status: 401,
    message: 'Unauthorized access.',
  },
  SOMETHING_WENT_WRONG: {
    code: 'SOMETHING_WENT_WRONG',
    status: 500,
    message: 'Unauthorized access.',
  },
  LOGIN_SUCCESSFUL: {
    code: 'LOGIN_SUCCESSFUL',
    status: 200,
    message: 'User Successfully Login',
  },
  INVALID_INPUT: {
    code: 'INVALID_INPUT',
    status: 400,
    message: 'Invalid input in request.',
  },
  INVALID_TOKEN: {
    code: 'INVALID_TOKEN',
    status: 403,
    message:
      'Invalid or expired token. Forbidden access.',
  },
  NO_TOKEN: {
    code: 'NO_TOKEN',
    status: 401,
    message:
      'No token provided. Unauthorized access.',
  },
  TOKEN_GENERATED: {
    code: 'TOKEN_GENERATED',
    status: 200,
    message:
      'Token Generated Successfully',
  },
  USER_EXISTS: {
    code: 'USER_EXIST',
    status: 409,
    message: 'The email id you entered already exists. Try another?',
  },
  USER_REGISTERED: {
    code: 'USER_REGISTERED',
    status: 201,
    message: 'User Created Successfully',
  },
  INVALID_USER_LOGIN: {
    code: 'INVALID_USER_LOGIN',
    status: 401,
    message:
      'You have entered an invalid username or password. Please try again',
  },
  MOBILE_EXIST: {
    code: 'MOBILE_EXIST',
    status: 409,
    message: 'The mobile number you entered already exists. Try another',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    status: 404,
    message: 'No such resource exists.',
  },
};
