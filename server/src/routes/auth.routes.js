import { Router } from 'express'
import { loginController, registerController } from './../controllers/auth.controllers.js'

const router = Router()

router.post('/vip/login', loginController)
router.post('/vip/register', registerController)

export default router