/**
 * Title: middleware/async.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
