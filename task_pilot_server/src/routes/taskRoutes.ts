import { Router } from 'express';
import taskController from '../controllers/taskController';
import { checkAdmin } from '../middlewares/adminMiddlware';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/', taskController.getAllUserTasks);
router.get('/all', checkAdmin, taskController.getAllTasks);
router.post('/', taskController.addTask);
router.put('/reorder', taskController.reorderTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);


export default router;
