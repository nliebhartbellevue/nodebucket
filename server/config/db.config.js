/**
 * Title: config/db.config.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import multer from "multer";
import mongoose from "mongoose";
import crypto from "crypto";
import path from "path";
import GridFsStorage from "multer-gridfs-storage";

import { GridFsBucket } from "mongoose";

export default class DbConfig {
  /** @type {mongoose.Connection} */
  static conn;
  /** @type {string} */
  static mongoUri;
  /** @type {multer.Instance} */
  static upload;
  /** @type {GridFsBucket} */
  static gfsBucket;

  constructor(dbName, bucketName) {
    this.dbName = dbName;
    this.bucketName = bucketName;
    this.mongoURI = `mongodb://dbuser:password1@ds259518.mlab.com:59518/nodebucket-db?retryWrites=true&w=majority`;
  }

  async connectDb() {
    mongoose.connect(this.mongoURI, {
      useUnifiedTopology: true,
      userCreateIndex: true
    });

    // retrieve mongoose default connection
    DbConfig.conn = mongoose.connection;

    DbConfig.conn.once("open", () => {
      console.log(`Connected to NodeBucket database`);

      DbConfig.gfsBucket = new mongoose.mongo.GridFSBucket(DbConfig.conn.db, {
        bucketName: this.bucketName
      });
    });

    DbConfig.conn.on("error", err => console.error(err.message));

    const storage = new GridFsStorage({
      db: DbConfig.conn,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            const filename =
              buf.toString("hex") + path.extname(file.originalname);
            const fileInfo = {
              metadata: {
                originalname: file.originalname
              },
              filename,
              bucketName: this.bucketName
            };
            resolve(fileInfo);
          });
        });
      }
    });

    DbConfig.upload = multer({
      storage,
      fileFilter: (req, file, cb) => {
        file.mimetype.includes("image")
          ? cb(null, true)
          : cb(new Error("Wrong file type - only accepts images"));
      }
    });

    return DbConfig.conn;
  }

  static getMulterUploadMiddleware() {
    return async (...args) => DbConfig.upload.single("file")(...args);
  }
}
