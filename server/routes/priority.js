import express from 'express';
import * as db from "../utils/DataBaseUtils";

const routerPriority = express.Router();

routerPriority.get('/', (req, res) => {
    db.listPriorities().then(data => res.send(data));
});

export default routerPriority;
