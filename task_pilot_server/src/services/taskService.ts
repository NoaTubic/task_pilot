import Task from '../models/task';
import TaskRepository from '../repositories/taskRepository';

class TaskService {
  static getAllUserTasks = async (userId: string) => {
    return await TaskRepository.getAllUserTasks(userId);
  };

  static getAllTasks = async () => {
    return await TaskRepository.getAllTasks();
  };

  static async createTask(title: string, description: string, userId: string) {
    return await TaskRepository.createTask(title, description, userId);
  }
  static updateTask = async (id: string, title: string, description: string, isCompleted: boolean) => {
    const task = await TaskRepository.updateTask(id, { title, description, isCompleted });
    if (task) {
      return task;
    }
    throw new Error('Task not found');
  };

  static deleteTask = async (id: string,) => {
    const result = await TaskRepository.deleteTask(id);

  };

  static reorderTasks = async (userId: string, taskIdsInOrder: string[]) => {
    await TaskRepository.reorderTasks(userId, taskIdsInOrder);
  };
}

export default TaskService;
