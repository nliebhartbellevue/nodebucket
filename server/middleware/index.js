/**
 * Title: middleware/index.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import RouteProtectorMiddleware from './route-protector.middleware';
import AuthMiddleware from './auth.middleware';

export { RouteProtectorMiddleware, AuthMiddleware };
