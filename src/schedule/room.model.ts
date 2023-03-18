import { ApiProperty } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';

interface RoomI {
  firstName: string;
  lastName: string;
}

export enum LessonType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Table
export class Room extends Model<Room> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @ApiProperty({
    description: 'имя кабинета',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Lesson)
  @Column({ type: DataType.INTEGER })
  lessonId: number;

  @BelongsTo(() => Lesson, { foreignKey: 'lessonId' })
  lesson: Lesson;

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
