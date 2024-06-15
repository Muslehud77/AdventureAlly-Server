import express from "express"
import { userController } from "./user.controller"
import { validateRequest } from "../../Middlewares/validateRequest"
import { userValidation } from "./user.validation"

const router = express.Router()

router.patch('/:id',validateRequest(userValidation.updateUserValidation),userController.updateUser)
router.delete('/:id',userController.deleteUser)



export const UserRouter = router