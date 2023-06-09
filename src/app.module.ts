import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { Group } from './group/group.model';
import { Day } from './schedule/day.model';
import { Lesson } from './schedule/lesson.model';
import { Subject } from './schedule/subject.model';
import { Room } from './schedule/room.model';
import { SequelizeModule, getConnectionToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { ScheduleModule } from './schedule/schedule.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      uri: process.env.DB_URL,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [User, Group, Day, Lesson, Subject, Room],
      autoLoadModels: true,
      synchronize: true,
      name: 'db_connect',
    }),
    UserModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: AppService,
      useFactory: (appSequelize: Sequelize) => {
        return new AppService(appSequelize);
      },
      inject: [getConnectionToken('db_connect')],
    },
  ],
})
export class AppModule {}
