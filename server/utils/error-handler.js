/**
 * Title: utils/error-handler.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
export const errorHandler = (message, status = 500) => {
  const error = new Error(message);
  error.statusCode = status;
  return error;
};
