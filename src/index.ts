import express, { json } from "express";
import { WebSocketServer } from "ws";
import ShareDB from "sharedb";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import { connectionHandler } from "./handlers";
import {
  baseFileMiddleware,
  applyMiddleware,
  cookieMiddleware,
} from "./middlewares";
import { userFilesRoute, loginRoute } from "./routers";
import rateLimit from "express-rate-limit";

const app = express();

app.use(cookieParser());

app.use(json());

app.use(cookieMiddleware);

app.use(express.static(path.resolve(process.cwd(), "dist/client")));

app.use(loginRoute);

app.use(userFilesRoute);

app.get("*", baseFileMiddleware);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ server });

const backend = new ShareDB();

webSocketServer.on("connection", connectionHandler(backend));

backend.use("apply", applyMiddleware);

server.listen(8080, () => console.log(`[SERVER] listening at port 8080 now`));
