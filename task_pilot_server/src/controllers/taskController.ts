import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { serialize, deserialize } from '../utils/serialization';
import { logger } from '../config/logger';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import TaskService from '../services/taskService';

const taskService = new TaskService();

class TaskController {

  getAllUserTasks = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const tasks = await TaskService.getAllUserTasks(req.user.id);
    logger.info(`Successfully fetched all tasks for user with ID: ${req.user.id}`);
    res.json(tasks.map((task: any) => JSON.parse(serialize(task))));
  });


  getAllTasks = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await TaskService.getAllTasks();
    logger.info('Successfully fetched all tasks');
    res.json(tasks.map((task: any) => JSON.parse(serialize(task))));
  });


  addTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    logger.info(`Request Body: ${JSON.stringify(req.body)}`);
    try {
      const deserializedTask = deserialize('task', req.body);
      const task = await TaskService.createTask(deserializedTask.title, deserializedTask.description, req.user.id);
      logger.info(`Successfully added task with ID: ${task.id}`);
      res.status(201).json(JSON.parse(serialize(task)));
    } catch (error) {
      logger.error(`Deserialization failed: ${error}`);
      res.status(400).json({ message: 'Invalid data' });
    }
  });


  updateTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    logger.info(`Request Body: ${JSON.stringify(req.body)}`);
    try {
      const deserializedTask = deserialize('task', req.body);
      const updatedTask = await TaskService.updateTask(id, deserializedTask.title, deserializedTask.description, deserializedTask.isCompleted);
      logger.info(`Successfully updated task with ID: ${id}`);
      res.json(JSON.parse(serialize(updatedTask)));
    } catch (error) {
      logger.error(`Deserialization failed: ${error}`);
      res.status(400).json({ message: 'Invalid data' });
    }
  });


  deleteTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    await TaskService.deleteTask(req.params.id);
    logger.info(`Successfully deleted task with ID: ${req.params.id}`);
    res.status(200).json({ message: `Successfully deleted task with ID: ${req.params.id}` });
  });


  reorderTasks = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { taskIdsInOrder } = req.body;
    await TaskService.reorderTasks(req.user.id, taskIdsInOrder);
    logger.info(`Successfully reordered tasks for user with ID: ${req.user.id}`);
    res.status(200).send('Successfully reordered tasks');
  });
}

export default new TaskController();
