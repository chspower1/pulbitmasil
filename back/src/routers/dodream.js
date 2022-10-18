import { Router } from "express";
const dodreamRouter = Router();
import { dodream } from "../db/mongoDB/mongodb.js";

dodreamRouter.get("/", function (req, res, next) {
  dodream()
    .then(result => res.status(200).json(result))
    .catch(console.error);
});

export { dodreamRouter };
