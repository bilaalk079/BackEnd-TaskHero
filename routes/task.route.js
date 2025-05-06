import express from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(authenticate)

router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router