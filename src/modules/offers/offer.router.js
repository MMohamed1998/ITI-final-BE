
import { validation } from "../../middleware/validation.js";
import * as offerController from "./controller/offer.js";
import { Router } from "express";
import * as validators from "./offer.validation.js";
import auth from "../../middleware/auth.js";
import { endPoint } from "./offer.endPoint.js";

const router = Router();


router.get('/:offerId',auth(endPoint.oneOffer),validation(validators.oneOffer) , offerController.getOffer)

router.get('/usersoffers',auth(endPoint.userOffer),
offerController.getUserOffers)

router.post('/addOffer',auth(endPoint.addOffer),
validation(validators.addOffer),
offerController.addOffer)

router.put('/updateOffer/:offerId',auth(endPoint.updateOffer),
validation(validators.updateOffer),
offerController.updateOffer)

router.delete('/deleteOffer/:offerId',auth(endPoint.deleteOffer),
validation(validators.deleteOffer),
offerController.deleteOffer)



export default router;