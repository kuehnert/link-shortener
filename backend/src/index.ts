import { $log, ServerLoader } from "@tsed/common";
require('dotenv').config();
import { Server } from "./Server";
const version = require('../package').version

async function bootstrap() {
  try {
    $log.info(`Start server, version ${version}...`);
    const server = await ServerLoader.bootstrap(Server);

    await server.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
