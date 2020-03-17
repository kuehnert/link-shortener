import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { pick } from "lodash";
import axios from "axios";
import ShortLink, {
  ShortLinkBase,
  shortlinkAttributes
} from "../models/ShortLink";

@Service()
export default class ShortLinkService {
  @Inject(ShortLink)
  private ShortLink!: MongooseModel<ShortLink>;

  // FETCHALL
  async fetchAll(): Promise<ShortLink[]> {
    const shortlinks = await this.ShortLink.find().sort({ title: 1 });
    // .exec();

    return shortlinks;
  }

  // FETCH
  async fetchOne(shortlinkId: string): Promise<ShortLink> {
    const shortlink = await this.ShortLink.findOne({
      _id: shortlinkId
    }).exec();

    return shortlink;
  }

  // CREATE
  async create(values: ShortLinkBase): Promise<ShortLink> {
    const permitted = pick(values, shortlinkAttributes);
    const shortlink = new this.ShortLink(permitted);

    await shortlink.save();
    return shortlink;
  }

  // UPDATE
  async update(shortlinkId: string, values: ShortLink): Promise<ShortLink> {
    const permitted = pick(values, shortlinkAttributes);

    if (Object.values(permitted).length === 0) {
      throw new Error("Invalid updates");
    }

    const shortlink = await this.ShortLink.findOne({
      _id: shortlinkId
    }).exec();

    if (!shortlink) {
      throw new Error("ShortLink not found");
    }

    const updates = Object.keys(permitted);
    updates.forEach(update => {
      // @ts-ignore
      shortlink[update] = permitted[update];
    });
    await shortlink.save();

    return shortlink;
  }

  // DELETE
  async delete(shortlinkId: string): Promise<ShortLink> {
    const shortlink = await this.ShortLink.findOneAndDelete({
      _id: shortlinkId
    });

    return shortlink;
  }

  // CLICK
  async click(shortlinkId: string): Promise<void> {
    const shortLink = await this.ShortLink.findOne({ _id: shortlinkId });
    shortLink.hits += 1;
    shortLink.save();
  }

  // FETCH missing icons
  async repairAll(): Promise<void> {
    const links = await this.ShortLink.find();

    links.forEach(async shortLink => {
      if (shortLink.icon == null) {
        const url = `https://i.olsh.me/icon?url=${shortLink.weburl}&size=32..128..256`;
        try {
          const result = await axios.get(url, { responseType: "arraybuffer" });
          const prefix = "data:" + result.headers["content-type"] + ";base64,";
          const pngBuffer = Buffer.from(
            String.fromCharCode(...new Uint8Array(result.data)),
            "binary"
          );
          shortLink.icon = prefix + pngBuffer.toString("base64");
          await shortLink.save();
        } catch (error) {
          console.log("error with shortlink", shortLink.title, error);
        }
      }
    });
  }
}
