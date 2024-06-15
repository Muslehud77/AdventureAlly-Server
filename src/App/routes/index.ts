import { Router } from "express";
import { UserRouter } from "../Modules/User/user.route";
import { AuthRouts } from "../Modules/Auth/auth.route";


const router = Router()

const moduleRoutes = [
    {
        path: "/users",
        route: UserRouter
    },
    
    {
        path: "/auth",
        route: AuthRouts
    },
    
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router