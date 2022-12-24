import express, { json } from "express";
import { WebSocketServer } from "ws";
import ShareDB from "sharedb";
import otJSON1 from "ot-json1";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import { connectionHandler } from "./handlers";
import {
  baseFileMiddleware,
  applyMiddleware,
  cookieMiddleware,
  limitMiddleware,
} from "./middlewares";
import { userFilesRoute, loginRoute } from "./routers";

const app = express();

app.use(cookieParser());

app.use(json());

app.use(cookieMiddleware);

app.use(express.static(path.resolve(process.cwd(), "dist/client")));

app.use(loginRoute);

app.use(userFilesRoute);

// Apply the rate limiting middleware to all requests
app.use(limitMiddleware);

app.get("*", baseFileMiddleware);

const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ server });

const backend = new ShareDB();
// register otJSON1 type
ShareDB.types.register(otJSON1.type);

webSocketServer.on("connection", connectionHandler(backend));

backend.use("apply", applyMiddleware);

server.listen(8080, () => console.log(`[SERVER] listening at port 8080 now`));
