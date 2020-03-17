import {
  BodyParams,
  Controller,
  HeaderParams,
  Patch,
  PathParams,
  Post,
  Required,
  Status,
  UseBefore,
  Context
} from "@tsed/common";
import { verify } from "jsonwebtoken";
import { omit, pick } from "lodash";
import { NotFound } from "ts-httpexceptions";
import { $log } from "ts-log-debug";
import LoadUserMiddleware from "../../middlewares/LoadUserMiddleware";
import User, { BaseUser, userAttributes } from "../../models/User";
import UserService from "../../services/UserService";
import { TokenContent } from "src/models/Token";

interface UserSafe {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

// BodyParams: Express.request.body
// PathParams: Express.request.params
// QueryParams: Express.request.query
@Controller("/users")
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  // TODO: FETCH ALL TEACHERS

  // CREATE TEACHER
  @Post("/")
  async createUser(
    @BodyParams() newUser: BaseUser
  ): Promise<{ user: User; token: string }> {
    $log.debug("newUser:", newUser);

    if ((await this.userService.countUsers()) !== 0) {
      throw new Error("Es gibt bereits Benutzer.");
    }

    const user = await this.userService.create(newUser);
    const token = await this.userService.generateToken(user);

    let userObject = JSON.parse(JSON.stringify(user));
    userObject.id = userObject._id;
    userObject = omit(userObject, ["_id", "password", "tokens"]);
    return { user: userObject, token };
  }

  // PATCH
  @Patch("/:userId")
  @Status(201)
  @UseBefore(LoadUserMiddleware)
  async updateUser(
    @Required() @PathParams("userId") userId: string,
    @Required() @BodyParams() values: BaseUser,
    @Context() context: Context
  ): Promise<UserSafe> {
    const permitted = pick(values, userAttributes);
    const oldUser = context.get("currentUser");
    const user = await this.userService.update(userId, permitted);

    let userObject = JSON.parse(JSON.stringify(user));
    userObject.id = userObject._id;
    userObject = omit(userObject, ["_id", "password", "tokens"]);

    return userObject;
  }

  // LOGIN
  @Post("/login")
  @Status(200)
  async loginUser(
    @Required() @BodyParams("email") email: string,
    @Required() @BodyParams("password") password: string
  ): Promise<{ user: UserSafe; token: string }> {
    const user = await this.userService.findByCredentials(email, password);
    const token = await this.userService.generateToken(user);

    let userObject = JSON.parse(JSON.stringify(user));
    userObject.id = userObject._id;
    userObject = omit(userObject, ["_id", "password", "tokens"]);

    return { user: userObject, token };
  }

  // POST LOGOUT
  @Post("/logout")
  async logoutUser(
    @Required() @HeaderParams("authorization") authorization: string
  ): Promise<void> {
    try {
      const secret = process.env.JWT_SECRET || "DUMMY";
      const token = authorization.substr(7);
      const decoded = verify(token, secret) as TokenContent;
      const user = await this.userService.findById(decoded.id as string);

      if (user == null) {
        $log.debug("user == null");
        throw new NotFound("Not authenticated");
      }

      user.tokens = user.tokens.filter(t => t !== token);
      await this.userService.update(decoded.id, user);
    } catch (err) {
      throw new NotFound("Not authorized");
    }

    return;
  }
}
