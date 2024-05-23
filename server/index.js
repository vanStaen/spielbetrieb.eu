import path from "path";
import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { fileURLToPath } from "url";

import db from "./models/index.js";
import graphqlSchema from "./graphql/schema.js";
import graphqlResolver from "./graphql/resolvers.js";
import isAuth from "./middleware/isAuth.js";
import cookieSession from "./middleware/cookieSession.js";
import redirectTraffic from "./middleware/redirectTraffic.js";

import { router as AuthRouter } from "./api/controller/authController.js";
import { router as UserRouter } from "./api/controller/userController.js";
import { router as MailRouter } from "./api/controller/mailController.js";
import { router as UploadRouter } from "./api/controller/uploadController.js";
import { router as NewsletterRouter } from "./api/controller/newsletterController.js";
import { router as SocialRouter } from "./api/controller/socialController.js";

import "./lib/loadEnv.js";

const PORT = process.env.PORT || 5017;

// Init Express
const app = express();

// Redirect trafic to root and https
app.set("trust proxy", true);
app.use(redirectTraffic);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow cross origin request
app.use(function (req, res, next) {
  let corsOptions = {};
  if (req.get("host") === "localhost:5017") {
    corsOptions = {
      origin: "http://localhost:3001",
      credentials: true,
      optionsSuccessStatus: 200,
    };
  } else {
    corsOptions = {
      origin: [
        "https://www.merrier.app",
        "https://merrier.app",
        "https://www.spielbetrieb.eu",
        "https://spielbetrieb.eu",
        "http://spielbetrieb-5c012944af85.herokuapp.com",
        "https://spielbetrieb-5c012944af85.herokuapp.com",
      ],
      credentials: true,
      optionsSuccessStatus: 200,
    };
  }
  cors(corsOptions)(req, res, next);
});

// Session Cookie Middleware
app.use(cookieSession);

// Authorization Middleware
app.use(isAuth);

// Router to API endpoints
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/mail", MailRouter);
app.use("/upload", UploadRouter);
app.use("/newsletter", NewsletterRouter);
app.use("/social", SocialRouter);

// Start DB
db.sequelize.sync().then((req) => {
  // GraphQL
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
      customFormatErrorFn(err) {
        if (!err.originalError) {
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || "An error occured with GraphQl";
        const code = err.originalError.code || 500;
        return { message, status: code, data };
      },
    }),
  );
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up for React
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
