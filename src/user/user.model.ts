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
import { Group } from 'src/group/group.model';

interface UserI {
  firstName: string;
  lastName: string;
}

export enum UserType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Table
export class User extends Model<User, UserI> {
  @ApiProperty({
    description: 'id пользоавателя',
    example: 2,
  })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ApiProperty({
    description: 'имя пользователя',
  })
  @Column({ type: DataType.STRING })
  firstName: string;

  @ApiProperty({
    description: 'фамилия пользователя',
    example: 'Выставка картин',
  })
  @Column({ type: DataType.STRING })
  lastName: string;

  @ApiProperty({
    description: 'подтверждён в вк',
    example: false,
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_vk_auth?: boolean;

  @ApiProperty({
    description: 'тип пользователя',
    enum: UserType,
    required: false,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(UserType),
    allowNull: false,
  })
  type: UserType;

  @ApiProperty({
    description: 'телефон',
    example: '78534122653',
    required: false,
  })
  @Column({ type: DataType.STRING, unique: true })
  phone: string;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER })
  groupId: number;

  @BelongsTo(() => Group, { foreignKey: 'groupId' })
  group: Group;
}
