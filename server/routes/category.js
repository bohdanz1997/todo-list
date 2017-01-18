import express from 'express';
import * as db from "../utils/DataBaseUtils";

const routerCategory = express.Router();

routerCategory.get('/', (req, res) => {
  db.listCategories().then(data => res.send(data));
});

routerCategory.post("/", (req, res) => {
  db.createCategory(req.body).then(data => res.send(data));
});

routerCategory.delete("/:id", (req, res) => {
  db.deleteCategory(req.params.id).then(data => { console.log(data); res.sendStatus(200) });
});

export default routerCategory;
