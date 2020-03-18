/**
 * Title: config/server.config.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import Express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import DbConfig from "./db.config";
import { AuthMiddleware } from "../middleware";

export default class ServerConfig {
  constructor({ port, middlewares, routers }) {
    this.app = Express();
    this.app.set("env", "development");
    this.app.set("port", port);
    this.registerCORSMiddleware()
      .registerHelmetMiddleware()
      .registerMorganMiddleware()
      .registerJwtPassportMiddleware()
      .registerJSONMiddleware();

    middlewares &&
      middlewares.forEach(mdlw => {
        this.registerMiddleware(mdlw);
      });

    this.app.get("/ping", (req, res, next) => {
      res.send("pong");
    });

    routers &&
      routers.forEach(({ baseUrl, router }) => {
        this.registerRouter(baseUrl, router);
      });

    this.registerMiddleware(
      // catch 404 and forward to error handler
      (req, res, next) => {
        let err = new Error("Not Found!");
        err.statusCode = 404;
        next(err);
      }
    );
    this.registerErrorHandlingMiddleware();
  }

  get port() {
    return this.app.get("port");
  }

  set port(number) {
    this.app.set("port", number);
  }

  /**
   * register all middleware
   * @param {*} middleware
   */
  registerMiddleware(middleware) {
    this.app.use(middleware);
    return this;
  }

  /**
   * register Express router
   * @param {*} router
   */
  registerRouter(baseUrl, router) {
    this.app.use(baseUrl, router);
    return this;
  }

  /**
   * register Express JSON middleware
   * to handle requests with JSON body
   */
  registerJSONMiddleware() {
    this.registerMiddleware(Express.json());
  }

  /**
   * register CORS middleware
   * for cross origin requests
   */
  registerCORSMiddleware() {
    this.registerMiddleware(cors());
    return this;
  }

  /**
   * register Helmet middleware
   * for Security HTTP request
   */
  registerHelmetMiddleware() {
    this.app.use(helmet());
    return this;
  }

  /**
   * register Morgan middleware
   * for request logging
   */
  registerMorganMiddleware() {
    this.registerMiddleware(morgan("combined"));
    return this;
  }

  /**
   * register the Express Error middleware
   */
  registerErrorHandlingMiddleware() {
    this.app.get("env") === "development"
      ? this.registerMiddleware(
          ({ statusCode = 500, message, stack }, req, res, next) => {
            res.status(statusCode);
            res.json({
              statusCode,
              message,
              stack
            });
          }
        )
      : this.registerMiddleware(
          ({ statusCode = 500, message }, reg, res, next) => {
            res.status(statusCode);
            res.json({ statusCode, message });
          }
        );
    return this;
  }

  /**
   * register jwt Passport authentication middleware
   */
  registerJwtPassportMiddleware() {
    const authMdlw = new AuthMiddleware();
    const passportJwtMiddleware = authMdlw.registerJwtStrategy();
    this.registerMiddleware(passportJwtMiddleware);
    return this;
  }

  async listen() {
    try {
      const dbConf = new DbConfig("nodebucket-db", "images");
      await dbConf.connectDb();

      this.app.listen(this.port, () => {
        console.log(`Listening on port: ${this.port}`);
      });
    } catch (error) {
      console.error(`DB error: ${error.message}`);
    }
  }
}
