import express from 'express'
import { createTask, deleteTask, getSingleTask, getTasks, updateTask } from '../controllers/task.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(authenticate)

router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.get('/:id', getSingleTask)

export default router