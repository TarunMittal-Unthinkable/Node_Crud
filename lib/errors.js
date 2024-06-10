import pkg from 'lodash';
const { mapValues } = pkg;
import ApiError from './api-error.js';
import errorCodes from './error-codes.js';

// Transform error value into error functions
export default mapValues(errorCodes, (val, key) => {
  return (message) => new ApiError(message || val.message, val.status, key);
});
