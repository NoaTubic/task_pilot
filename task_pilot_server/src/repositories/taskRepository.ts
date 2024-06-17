// src/repositories/taskRepository.ts
import { Task } from '../models/task';

type TaskCreationAttributes = {
  title: string;
  description?: string;
  order: number;
  isCompleted?: boolean;
};

export class TaskRepository {
  async getAllTasks(): Promise<Task[]> {
    return await Task.findAll({ order: [['order', 'ASC']] });
  }

  async createTask(task: TaskCreationAttributes): Promise<Task> {
    return await Task.create(task);
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task | null> {
    await Task.update(task, { where: { id } });
    return await Task.findByPk(id);
  }

  async deleteTask(id: number): Promise<void> {
    await Task.destroy({ where: { id } });
  }
}
