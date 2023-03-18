import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.findAll();
  }
  async getUser(id: number): Promise<User> {
    return await this.userModel.findOne({ where: { id } });
  }

  async setActiveUser(id: number): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });
    return await user.update({ is_vk_auth: true });
  }
}
