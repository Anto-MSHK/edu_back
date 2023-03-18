import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from 'src/group/group.model';
import { User } from 'src/user/user.model';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Group) private groupModel: typeof Group) {}
  async getSchedule(): Promise<Group[]> {
    return await this.groupModel.findAll();
  }
}
