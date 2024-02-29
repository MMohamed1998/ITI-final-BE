
import { validation } from "../../middleware/validation.js";
import * as projectController from "./controller/project.js";
import { Router } from "express";
import * as validators from "./project.validation.js";
import auth from "../../middleware/auth.js";
import { endPoint } from "./project.endPoint.js";

const router = Router();


router.get('/' , projectController.getProjects)

router.get('/userProjects',auth(endPoint.userProject),
projectController.getUserProjects)

router.post('/addProject',auth(endPoint.addProject),
validation(validators.addProject),
projectController.addProject)

router.put('/updateProject/:projectId',auth(endPoint.updateProject),
validation(validators.updateProject),
projectController.updateProject)

router.delete('/deleteProject/:projectId',auth(endPoint.deleteProject),
validation(validators.deleteProject),
projectController.deleteProject)



export default router;