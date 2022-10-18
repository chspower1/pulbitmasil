import { Router } from "express";
const trashRouter = Router();
import maria from "../db/connect/maria";

trashRouter.get("/", async function (req, res) {
  const [rows] = await maria.execute("SELECT * FROM TRASHCAN");
  if (rows.length) {
    res.status(200).json(rows);
  } else {
    next(err);
  }
});

trashRouter.get("/count", async function (req, res) {
  const [rows] = await maria.execute("SELECT * FROM TRASHCOUNT");
  if (rows.length) {
    res.status(200).json(rows);
  } else {
    next(err);
  }
});

export { trashRouter };
