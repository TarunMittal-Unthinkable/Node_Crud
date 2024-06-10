import config from 'config';
import errorResponse from '../constant/error-response.js';

/**
 * @class API Error class.
 */

class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this._status = status;
    this._code = code;
  }

  /**
   * Sends error JSON to response stream.
   * @param {Response} res Server response.
   */
  send(res) {
    // set status
    res.status(this._status || 500);
console.log("===errrr======", this.errorId)
    // send JSON
    res.json({
      errorId: this.errorId,
      isError: true,
      code: this._code || errorResponse.INTERNAL_ERROR,
      message: this.message,
      stack: process.env.showErrorStack ? this.stack : undefined,
    });
  }
  /**
   * @return {JSON} error.
   */
  get() {
    // return JSON
    return {
      isError: true,
      status: this._status || 500,
      code: this._code || errorResponse.INTERNAL_ERROR,
      message: this.message,
    };
  }
}

export default ApiError;
