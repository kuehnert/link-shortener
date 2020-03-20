import "@tsed/ajv";
import {
  GlobalAcceptMimesMiddleware,
  ServerLoader,
  ServerSettings
} from "@tsed/common";
import "@tsed/mongoose";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as methodOverride from "method-override";
import { join } from "path";

const rootDir = __dirname;

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 5000,
  httpsPort: false,
  ajv: {
    errorFormat: error =>
      `At ${error.modelName}${error.dataPath}, value '${error.data}' ${error.message}`,
    options: { verbose: true }
  },
  logger: {
    debug: false,
    level: "info",
    logRequest: false,
    requestFields: ["duration", "method", "params", "query", "url"]
  },
  mount: {
    "/api": join(rootDir, "controllers", "api", "*.ts"),
    "/": join(rootDir, "controllers", "RedirectController.ts")
  },
  mongoose: {
    url: process.env.MONGODB_URL,
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  }
})
export class Server extends ServerLoader {
  $beforeRoutesInit(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      );
  }
}
