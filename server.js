import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import route from "./routes/routes.js";
import mongoose from "mongoose";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, MONGO_SERVER, MONGO_PORT, SESSION_SECRET } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set("view engine", "pug");
app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,

}));
app.use((req, res, next) => {
  app.locals.user = req.session.user || null;
  next();
});

// ==========
// App routers
// ==========

app.use("/", route);

// ==========
// App start
// ==========

mongoose.connect(`mongodb://${MONGO_SERVER}:${MONGO_PORT}/yam`).then(async ()=>{
  app.listen(APP_PORT, () => {
    console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
  });
});