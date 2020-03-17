import { Email, Property, PropertyType, Required } from '@tsed/common';
import { Model, ObjectID, Unique } from '@tsed/mongoose';

export const shortlinkAttributes = [
  'shortname',
  'title',
  'weburl',
  'description',
  'hidden',
];

export interface ShortLinkBase {
  shortname: string;
  title: string;
  weburl: string;
  description: string;
  hidden: boolean;
}

@Model()
export default class ShortLink {
  @ObjectID('id')
  _id!: string;

  @Property()
  @Required()
  @Unique()
  shortname!: string;

  @Property()
  @Required()
  @Unique()
  title!: string;

  @Property()
  @Required()
  @Unique()
  weburl!: string;

  @Property()
  description!: string;

  @Property()
  hidden: boolean = false;

  @Property()
  hits: number = 0;

  @Property()
  icon?: string;
}
