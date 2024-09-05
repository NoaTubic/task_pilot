import sequelize from '../config/database';
import Task from '../models/task';

type TaskCreationAttributes = {
  title: string;
  description?: string;
  order: number;
  isCompleted?: boolean;
  userId: string;
};

export class TaskRepository {

  async getAllUserTasks(userId: string): Promise<Task[]> {
    return await Task.findAll({ where: { userId } });
  }

  async getAllTasks(filter?: string): Promise<Task[]> {
    return await Task.findAll();
  }

  async createTask(title: string, description: string, userId: string) {
    const highestOrderTask = await Task.findOne({
      where: { userId },
      order: [['order', 'DESC']]
    });
    const order = highestOrderTask ? highestOrderTask.order + 1 : 1;

    return await Task.create({ title, description, userId, order });
  }


  async updateTask(id: string, task: Partial<Task>): Promise<Task | null> {
    await Task.update(task, { where: { id } });
    return await Task.findByPk(id);
  }

  async deleteTask(id: string): Promise<void> {
    await Task.destroy({ where: { id } });
  }

  async reorderTasks(userId: string, taskIdsInOrder: string[]) {
    const tasks = await Task.findAll({ where: { userId } });
    const taskMap = tasks.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {} as Record<string, Task>);

    await Task.sequelize?.transaction(async (transaction) => {
      for (let i = 0; i < taskIdsInOrder.length; i++) {
        const taskId = taskIdsInOrder[i];
        const task = taskMap[taskId];
        if (task) {
          task.order = i + 1;
          await task.save({ transaction });
        }
      }
    });
  };
}

export default new TaskRepository();
