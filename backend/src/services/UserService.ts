import { Inject, Service } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Error } from 'mongoose';
import User, { BaseUser } from '../models/User';
import hashPassword from '../utils/hashPassword';

@Service()
export default class UserService {
  @Inject(User)
  private User!: MongooseModel<User>;

  // FETCH ALL
  async findAll(): Promise<User[]> {
    return await this.User.find();
  }

  async findById(userId: string): Promise<User> {
    const user = await this.User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findByCredentials(email: string, password: string): Promise<User> {
    const user = await this.User.findOne({ email });

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return user;
  }

  // CREATE
  async create(values: BaseUser): Promise<User> {
    const user = new this.User(values);
    user.password = await hashPassword(values.password);
    await user.save();
    return user;
  }

  // UPDATE
  async update(userId: string, permitted: Partial<BaseUser>): Promise<User> {
    const user = await this.User.findOne({ _id: userId }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    const updates = Object.keys(permitted);
    updates.forEach(update => {
      // @ts-ignore
      user[update] = permitted[update];
    });

    await user.save();
    return user;
  }

  // DELETE
  async delete(userId: string): Promise<User> {
    const user = await this.User.findOneAndDelete({ _id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // COUNT USERS
  async countUsers(): Promise<number> {
    const count = this.User.countDocuments();
    return count;
  }

  // GENERATE TOKEN
  async generateToken(user: User): Promise<string> {
    if (!process.env.JWT_SECRET) {
      throw new Error('No JWT Secret!');
    }

    const userDoc = new this.User(user);
    const token = sign({ id: userDoc._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    userDoc.tokens = [...userDoc.tokens, token];
    await userDoc.save();

    return token;
  }
}
