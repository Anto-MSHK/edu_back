import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { getModelToken } from '@nestjs/sequelize';
import { Group } from 'src/group/group.model';
import { User } from 'src/user/user.model';
import { Day } from './day.model';
import { Lesson } from './lesson.model';
import { Room } from './room.model';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { Subject } from './subject.model';

@Module({
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    {
      provide: getModelToken(Group),
      useValue: Group,
    },
  ],
  //   imports: [SequelizeModule.forFeature([Group])],
})
export class ScheduleModule {}
