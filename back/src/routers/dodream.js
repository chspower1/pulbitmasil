import { Router } from "express";
const dodreamRouter = Router();
import { getDodream } from "../db/mongoDB/mongodb.js";

dodreamRouter.get("/", function (req, res, next) {
  getDodream()
    .then(result => res.status(200).json(result))
    .catch(console.error);
});

export { dodreamRouter };
