import { TaskRepository } from '../repositories/taskRepository';
import { Task } from '../models/task';

type TaskCreationAttributes = {
  title: string;
  description?: string;
  isCompleted?: boolean;
};

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }

  async createTask(task: TaskCreationAttributes): Promise<Task> {
    const tasks = await this.taskRepository.getAllTasks();
    const order = tasks.length + 1;
    return this.taskRepository.createTask({ ...task, order });
  }

  updateTask(id: number, task: Partial<Task>): Promise<Task | null> {
    return this.taskRepository.updateTask(id, task);
  }

  deleteTask(id: number): Promise<void> {
    return this.taskRepository.deleteTask(id);
  }
}
