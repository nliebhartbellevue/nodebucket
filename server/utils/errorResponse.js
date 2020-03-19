/**
 * Title: utils/errorResponse.js;
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
