/**
 * Title: auth/auth.model.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
export interface AuthModel {
  empid?: string;
  password?: string;
  name?: string;
  email?: string;
  role?: string;
  avatarPath?: string;
  designation?: string;
}
