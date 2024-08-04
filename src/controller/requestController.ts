import express from 'express';
import * as request from "./request/index.ts"

const requestRouter = express.Router();

requestRouter.get("/", request.getAll);
requestRouter.post("/", request.create);
requestRouter.patch("/:requestId", request.toggle);

export { requestRouter }