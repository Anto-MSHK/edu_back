import { ApiProperty } from '@nestjs/swagger';
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
}
