import { Controller, PathParams, Get, Req, Response } from "@tsed/common";
import ShortLinkService from "../services/ShortLinkService";
import { $log } from "ts-log-debug";
import { NotFound } from "ts-httpexceptions";

@Controller("/")
export class RedirectController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @Get("/")
  async getHome(@Response() response: Response) {
    $log.info('RedirectController @Get("/")');
    response.redirect(process.env.REACT_URL);
  }

  @Get("/:path")
  async get(
    @PathParams("path") path: string,
    @Response() response: Response
  ): Promise<void> {
    $log.info(`RedirectController @Get(/${path})`);
    const shortLink = await this.shortLinkService.fetchByShortnameAndInc(path);

    if (shortLink) {
      response.redirect(shortLink.weburl);
    } else {
      response.redirect(process.env.REACT_URL + `?notfound=${path}`);
    }
  }
}
