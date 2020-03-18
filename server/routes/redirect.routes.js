/**
 * Title: routes/redirect.routes.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import { Router } from "express";

const router = Router();

// 308 permanent redirect (method + body not modified)
router.all("/tasks*"),
  (req, res) => {
    res.redirect(308, `/api/${req.url}`);
  };

export const redirectRouter = {
  baseUrl: "/",
  router
};
