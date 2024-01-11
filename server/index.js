const path = require("path");
const express = require("express");
const cors = require(`cors`);
const { graphqlHTTP } = require("express-graphql");

const db = require("./models");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const isAuth = require("./middleware/isAuth");
const cookieSession = require("./middleware/cookieSession");
const redirectTraffic = require("./middleware/redirectTraffic");

require("dotenv/config");

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
      origin: "http://localhost:8087",
      credentials: true,
      optionsSuccessStatus: 200,
    };
  } else {
    corsOptions = {
      origin: [
        "https://www.spielbetrieb.online",
        "https://.spielbetrieb.online",
        "https://www.merrier.app",
        "https://merrier.app",
        "http://spielbetrieb-a7e78c82af5a.herokuapp.com",
        "http://spielbetrieb-a7e78c82af5a.herokuapp.com",
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
app.use("/auth", require("./api/controller/authController"));
app.use("/user", require("./api/controller/userController"));
app.use("/mail", require("./api/controller/mailController"));

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
        return { message: message, status: code, data: data };
      },
    })
  );
});

// Set up for React
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));