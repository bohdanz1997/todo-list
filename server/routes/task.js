import express from 'express';
import * as db from "../utils/DataBaseUtils";

const routerTask = express.Router();

routerTask.get('/', (req, res) => {
  db.listTasks().then(data => res.send(data));
});

routerTask.get("/:id", (req, res) => {
  db.getTask(req.params.id).then(data => res.send(data));
});

routerTask.post("/", (req, res) => {
  db.createTask(req.body).then(data => res.send(data));
});

routerTask.post("/edit", (req, res) => {
  db.editTask(req.body).then(data => res.send(data));
});

routerTask.delete("/:id", (req, res) => {
  db.deleteTask(req.params.id).then(data => res.sendStatus(200));
});

export default routerTask;
