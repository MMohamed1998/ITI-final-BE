import * as UserController from "./controller/user.js"
import { Router } from "express";
import { validation } from '../../middleware/validation.js';
import * as validators from './user.validation.js'
import auth from "../../middleware/auth.js";
import { endPoint } from "./user.endPoint.js";
import { fileUpload, fileValidation } from '../../utils/multer.js';
const router = Router()




router.get('/',auth(endPoint.addUsers),
UserController.getUsers)

router.get('/userProfile/',auth(endPoint.update),
UserController.userProfile)

router.get('/userProfile/:id',auth(endPoint.update),
UserController.userProfileId)

router.post('/addUser',auth(endPoint.addUsers),
validation(validators.addUser),
UserController.addUsers)

router.put('/updateUser/:_id',auth(endPoint.update),
validation(validators.updateUser),
UserController.updateUsers)

router.delete('/deleteUser/:userId',auth(endPoint.update),
validation(validators.deleteUser),
UserController.deleteUser)

router.patch('/changePassword',auth(endPoint.update),
validation(validators.changePassword),
UserController.changePassword)

router.put('/userImage',auth(endPoint.update),
fileUpload("user/profileImage",fileValidation.image).single('image'),
UserController.addUserImage)




export default router