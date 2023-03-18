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

interface SubjectI {
  firstName: string;
  lastName: string;
}

export enum LessonType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Table
export class Subject extends Model<Subject> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @ApiProperty({
    description: 'имя предмета',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
