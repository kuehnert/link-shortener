import {
  BodyParams,
  Controller,
  Get,
  Patch,
  PathParams,
  Post,
  Required,
  Status,
  UseBefore,
  Delete
} from "@tsed/common";
import LoadUserMiddleware from "../../middlewares/LoadUserMiddleware";
import ShortLink, { ShortLinkBase } from "../../models/ShortLink";
import ShortLinkService from "../../services/ShortLinkService";

@Controller("/shortlinks")
export class ShortLinksController {
  constructor(private readonly shortlinkService: ShortLinkService) {}

  // GET ALL
  @Get("/")
  async fetchAllShortLinks(): Promise<ShortLink[]> {
    return await this.shortlinkService.fetchAll();
  }

  // CREATE
  @Post("/")
  @UseBefore(LoadUserMiddleware)
  async createShortLink(
    @BodyParams() newShortLink: ShortLinkBase
  ): Promise<ShortLink> {
    return await this.shortlinkService.create(newShortLink);
  }

  // PATCH
  @Patch("/:shortlinkId")
  @Status(201)
  @UseBefore(LoadUserMiddleware)
  async updateShortLink(
    @Required() @PathParams("shortlinkId") shortlinkId: string,
    @Required() @BodyParams() values: ShortLink
  ): Promise<ShortLink> {
    const shortlink = await this.shortlinkService.update(shortlinkId, values);

    return shortlink;
  }

  // DELETE
  @Delete("/:shortlinkId")
  @Status(204)
  @UseBefore(LoadUserMiddleware)
  async deleteShortLink(
    @Required() @PathParams("shortlinkId") id: string
  ): Promise<void> {
    await this.shortlinkService.delete(id);
  }

  // CLICK
  @Post("/:shortlinkId/click")
  @Status(204)
  async clickShortLink(
    @Required() @PathParams("shortlinkId") id: string
  ): Promise<void> {
    await this.shortlinkService.click(id);
  }

  // POST Repair
  @Post("/repair")
  @Status(204)
  @UseBefore(LoadUserMiddleware)
  async repairShortLinks(): Promise<void> {
    await this.shortlinkService.repairAll();
  }
}
