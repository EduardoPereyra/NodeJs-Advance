import { envs } from "./config/index.js";
import { MongoDataBase } from "./data/mongodb/index.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";

(() => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}
