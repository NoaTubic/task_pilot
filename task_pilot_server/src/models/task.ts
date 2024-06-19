import { Model, Column, Table, DataType, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class Task extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order!: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isCompleted!: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt!: Date;
}
