import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from 'src/schedule/group.model';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Group) private groupModel: typeof Group) {}
  async getSchedule(): Promise<Group[]> {
    return await this.groupModel.findAll();
  }
}
