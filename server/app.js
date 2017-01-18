import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as db from "./utils/DataBaseUtils";

import categoryRoute from "./routes/category";
import taskRoute from "./routes/task";
import priorityRoute from "./routes/priority";

import { serverPort } from "../etc/config.json";

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use("/category", categoryRoute);
app.use("/task", taskRoute);
app.use("/priority", priorityRoute);

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});
