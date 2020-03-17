import {
  Context,
  HeaderParams,
  Middleware,
  PathParams,
  Required
} from "@tsed/common";
import { verify } from "jsonwebtoken";
import { TokenContent } from "src/models/Token";
import { Forbidden, Unauthorized } from "ts-httpexceptions";
import { $log } from "ts-log-debug";
import UserService from "../services/UserService";

@Middleware()
export class LoadUserMiddleware {
  constructor(private userService: UserService) {}

  async use(
    @Required() @HeaderParams("authorization") authorization: string,
    @Context() context: Context
  ) {
    $log.debug("LoadUserMiddleware");

    let decoded;
    try {
      // Decode token, cut "Bearer "
      const secret = process.env.JWT_SECRET;
      const token = authorization.substr(7);
      decoded = verify(token, secret) as TokenContent;
    } catch (err) {
      throw new Unauthorized("Invalid Credentials");
    }

    const currentUser = await this.userService.findById(decoded.id as string);

    if (currentUser == null) {
      $log.debug("currentUser == null");
      throw new Unauthorized("Not authenticated");
    }

    context.set("currentUser", currentUser);
    context.set("currentUserId", currentUser._id);
  }
}

export default LoadUserMiddleware;
