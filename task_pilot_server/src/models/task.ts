import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface TaskAttributes {
  id: string;
  title: string;
  description?: string;
  order: number;
  isCompleted: boolean;
  userId: string;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'description' | 'isCompleted'> { }

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public order!: number;
  public isCompleted!: boolean;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    Task.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }


}




Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'Tasks',
  }
);

export default Task;
