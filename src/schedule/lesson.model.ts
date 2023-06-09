import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  BeforeFind,
} from 'sequelize-typescript';
import { Sequelize } from 'sequelize';
import { Subject } from './subject.model';

import {
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManySetAssociationsMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
} from 'sequelize';
import { User } from 'src/user/user.model';
import { Room } from './room.model';
import { Day } from './day.model';
import { BeforeInsert } from 'typeorm';

interface LessonI {
  firstName: string;
  lastName: string;
}

export enum LessonType {
  PR = 'pr',
  TEOR = 'teor',
}

@Table({
  defaultScope: {
    include: [
      { model: Room, as: 'room' },
      { model: Subject, as: 'subject' },
    ],
  },
})
export class Lesson extends Model<Lesson> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @HasOne(() => Subject)
  subject: Subject;
  public getSubject: HasOneGetAssociationMixin<Subject>;
  public setSubject: HasOneSetAssociationMixin<Subject, number>;
  public createSubject: HasOneCreateAssociationMixin<Subject>;

  @ApiProperty({
    description: 'очерёдность пары',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count: number;

  @ApiProperty({
    description: 'тип пары',
    enum: LessonType,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(LessonType),
    allowNull: false,
  })
  type: LessonType;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user: User;

  @HasOne(() => Room)
  room: Room;
  public getRoom: HasOneGetAssociationMixin<Room>;
  public setRoom: HasOneSetAssociationMixin<Room, number>;
  public createRoom: HasOneCreateAssociationMixin<Room>;

  @ApiProperty({
    description: 'с этого времени пара начинается',
    example: '10:15',
  })
  @Column({
    type: DataType.STRING,
  })
  time_from: string;

  @ApiProperty({
    description: 'до этого времени пара идёт',
  })
  @Column({
    type: DataType.STRING,
  })
  time_to: string;

  @ForeignKey(() => Day)
  @Column({ type: DataType.INTEGER })
  dayId: number;

  @BelongsTo(() => Day, { foreignKey: 'dayId' })
  day: Day;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.fn('now'),
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.fn('now'),
  })
  updatedAt: string;
}
