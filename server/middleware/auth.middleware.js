/**
 * Title: middleware/auth.middleware.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Employee } from '../models';

export default class AuthMiddleware {

  constructor() {}

  /**
   * Passport JWT strategy implementation
   * to extract JWT token data and verify
   */
  registerJwtStrategy() {
    const authStrategy = new JwtStrategy(
      {
        secretOrKey: 'top secret',
        algorithms: ["HS256"],
        issuer: "nodebucket.com",
        ignoreExpiration: false,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer")
      },
      async (jwtPayload, done) => {
        const _id = jwtPayload.sub.toString();
        if (!_id) return done(null, false);

        try {
          let user = await User.findOne({ _id }).select({ credential: 0 });

          // set user on request object
          user ? done(null, user) : done(null, false);
        } catch (err) {
          done(err);
        }
      }
    );

    passport.use(authStrategy);
    return passport.initialize();
  }
}
