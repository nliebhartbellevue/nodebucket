/**
 * Title: utils/async-wrapper.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
// all errors caught by async wrapper and sent to
// error handler to eliminate try catch
export const AsyncWrapper = func => (req, res, next) => {
  func(req, res, next).catch(next);
};
