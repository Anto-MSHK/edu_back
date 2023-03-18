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
import { Lesson } from './lesson.model';
import { Group } from 'src/group/group.model';

interface DayI {
  firstName: string;
  lastName: string;
}

export enum LessonType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Table
export class Day extends Model<Day> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @ApiProperty({
    description: 'день недели',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count: number;

  @HasMany(() => Lesson)
  lessons: Lesson[];
  public getLessons!: HasManyGetAssociationsMixin<Lesson>;
  public addLesson!: HasManyAddAssociationMixin<Lesson, number>;
  public setLessons!: HasManySetAssociationsMixin<Lesson, number>;
  public removeLesson!: HasManyRemoveAssociationMixin<Lesson, number>;
  public createLesson!: HasManyCreateAssociationMixin<Lesson>;
  public countLessons!: HasManyCountAssociationsMixin;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER })
  groupId: number;

  @BelongsTo(() => Group, { foreignKey: 'groupId' })
  group: Group;

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
