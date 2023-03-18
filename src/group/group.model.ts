import { ApiProperty } from '@nestjs/swagger';
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
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Day } from 'src/schedule/day.model';
import { User } from 'src/user/user.model';

interface GroupI {
  firstName: string;
  lastName: string;
}

export enum UserType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Table
export class Group extends Model<Group, GroupI> {
  @ApiProperty({
    description: 'id события',
    example: 2,
  })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ApiProperty({
    description: 'название группы(должно быть уникальным)',
  })
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @ApiProperty({
    description: 'курс',
  })
  @Column({ type: DataType.INTEGER })
  course: number;

  @HasMany(() => User)
  users: User[];
  public getUsers!: HasManyGetAssociationsMixin<User>;
  public addUser!: HasManyAddAssociationMixin<User, number>;
  public setUsers!: HasManySetAssociationsMixin<User, number>;
  public removeUser!: HasManyRemoveAssociationMixin<User, number>;
  public createUser!: HasManyCreateAssociationMixin<User>;
  public countUsers!: HasManyCountAssociationsMixin;

  @HasMany(() => Day)
  days: Day[];
  public getDays!: HasManyGetAssociationsMixin<Day>;
  public addDay!: HasManyAddAssociationMixin<Day, number>;
  public setDays!: HasManySetAssociationsMixin<Day, number>;
  public removeDay!: HasManyRemoveAssociationMixin<Day, number>;
  public createDay!: HasManyCreateAssociationMixin<Day>;
  public countDays!: HasManyCountAssociationsMixin;
}
