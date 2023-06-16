import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import path from "path";
import { config } from "dotenv";
import userRouter from "./routes/user";
import projectRouter from "./routes/project";
import session from "express-session";

const ServerData = () => {
  const app = express();

  config();

  app.use(
    cors({
      credentials: true,
    })
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(express.json());
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));

  //session
  app.use(
    session({
      secret:'process.env.SESSION_SECRET',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.set("view engine", "ejs");
  app.set("views", "views");
  // api path
  app.use(userRouter);
  app.use(projectRouter);

  return app;
};

export default ServerData;