import { Router } from "express";
import { createLogs, fetchLogs, fetchLogsById, updateLogs, deleteLogs } from "../controller/log.controller.js";
const logRouter = Router();

logRouter.post('/', createLogs);
logRouter.get('/', fetchLogs);
logRouter.get('/:id', fetchLogsById);
logRouter.put('/:id', updateLogs);
logRouter.delete('/:id', deleteLogs);
logRouter.post('/', createLogs);
logRouter.get('/', fetchLogs);


export default logRouter;