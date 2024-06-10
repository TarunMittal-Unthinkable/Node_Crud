'use strict';
import bodyParser from 'body-parser';
import errors from './errors.js';

/**
 * Wraps "body-parser.json()" middleware.
 * Detects JSON parsing errors and forwards these as ApiError instances.
 *
 * @param {Object} options body-parser options.
 * @return {Function} wrapped middleware.
 */
export default (options) => {
  const bodyParserCallback = bodyParser.json(options);

  return (req, res, next) => {
    const errorHandler = (err) => {
      if (err && err.status && err.status === 400) {
        next(errors.INVALID_INPUT());
      } else {
        next(err);
      }
    };
    bodyParserCallback(req, res, errorHandler);
  };
};
