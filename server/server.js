/**
 * Title: server.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import { ServerConfig } from "./config";
import { redirectRouter, authRouter } from "./routes";

async function main() {
  const PORT = process.env.PORT || 3000;
  const server = new ServerConfig({
    port: PORT,
    routers: [redirectRouter, authRouter]
  });

  server.listen();
}

main();
