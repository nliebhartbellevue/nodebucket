/**
 * Title: services/auth/password.service.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import bcrypt from "bcrypt";

export default class PasswordService {
  #rounds = 8;

  /**
   * @param {number} rounds seies of rounds to give a secure hash.
   * Bcrypt will use the value entered and go through 2^rounds iterations of processing
   * on a 2GHz core:
   * rounds = 10 ~10 hashes/sec
   * rounds = 15: ~3 sec/hash
   * rounds = 25: ~1 hour/hash
   */
  constructor(rounds) {
    this.#rounds = rounds;
  }

  /**
   * generate hash from plaintext password
   * @param {string} password
   */
  async hash(password) {
    if (!password) throw new Error("Please provide a valid password!");

    return await bcrypt.hash(password, this.#rounds);
  }

  /**
   * check password generated from bcrypt
   * @param {string} password
   * @param {string} hash
   */
  async check(password, hash) {
    if (!password) throw new Error("Please provide a valid password!");

    return await bcrypt.compare(password, hash);
  }
}
