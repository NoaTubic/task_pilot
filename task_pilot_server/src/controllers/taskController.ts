// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

const taskService = new TaskService();

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching tasks.', error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const task = await taskService.createTask({ title, description });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the task.', error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskData = req.body;
    const task = await taskService.updateTask(Number(id), taskData);
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the task.', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(Number(id));
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the task.', error });
  }
};
