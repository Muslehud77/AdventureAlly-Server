import express from "express"
import { userController } from "./user.controller"
import { validateRequest } from "../../Middlewares/validateRequest"
import { userValidation } from "./user.validation"
import { Auth } from "../../Middlewares/auth"

const router = express.Router()

router.patch('/',Auth("user","admin"),validateRequest(userValidation.updateUserValidation),userController.updateUser)

router.patch('/status/:id',Auth("admin"),validateRequest(userValidation.updateUserValidation),userController.changeStatus)


router.patch('/',Auth("user","admin"),validateRequest(userValidation.updateUserValidation),userController.updateUser)

router.delete('/:id',Auth("admin"),userController.deleteUser)

router.get('/',Auth("admin"),userController.getAllUsers)



export const UserRouter = router