/**
 * Title: middleware/route-protector.middleware.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import passport from 'passport';

export default class RouteProtectorMiddleware {
  /**
   * returns passport middleware
   */
  authenticate() {
    return passport.authenticate('jwt', { session: false });
  }
}
