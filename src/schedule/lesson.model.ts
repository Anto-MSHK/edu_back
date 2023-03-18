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

interface LessonI {
  firstName: string;
  lastName: string;
}

export enum LessonType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Table
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

  @HasOne(() => User)
  teacher: User;
  public getTeacher: HasOneGetAssociationMixin<User>;
  public setTeacher: HasOneSetAssociationMixin<User, number>;
  public createTeacher: HasOneCreateAssociationMixin<User>;

  @HasOne(() => User)
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
