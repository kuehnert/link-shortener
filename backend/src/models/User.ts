import { Email, Property, PropertyType, Required } from '@tsed/common';
import { Model, ObjectID, Unique } from '@tsed/mongoose';

export const userAttributes = [
  'firstname',
  'lastname',
  'email',
];

export interface BaseUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Model()
export default class User {
  @ObjectID('id')
  _id!: string;

  @Property()
  @Required()
  firstname!: string;

  @Property()
  @Required()
  lastname!: string;

  @Email()
  @Required()
  @Unique()
  email!: string;

  @Property()
  @Required()
  password!: string;

  @PropertyType(String)
  @Required()
  tokens: string[] = [];
}
