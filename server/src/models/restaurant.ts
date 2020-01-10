import { Default, Table, Column, Model, AllowNull, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({timestamps: true})
export class Restaurant extends Model<Restaurant> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Default('')
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  sun: string;

  @AllowNull(false)
  @Column
  mon: string;

  @AllowNull(false)
  @Column
  tue: string;

  @AllowNull(false)
  @Column
  wed: string;

  @AllowNull(false)
  @Column
  thu: string;

  @AllowNull(false)
  @Column
  fri: string;

  @AllowNull(false)
  @Column
  sat: string;

  @Default('')
  @AllowNull(false)
  @Column
  type!: string;

  @Default('無')
  @AllowNull(false)
  @Column
  star!: string;

  @Default(false)
  @Column
  parking: boolean;

  @Default(false)
  @Column
  delivery!: boolean;

  @Default(false)
  @Column
  deposit!: boolean;

  @Default(0)
  @Column
  score!: number;

  @Default('')
  @Column
  position!: string;
}