// import express framework
import express from "express";

// import middleware
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

// import routes
import homeRouter from "./routes/homeRoute";
import projectsRouter from "./routes/projectRoute";
import emotionPredictorRouter from "./routes/emotionPredictorRoute";

const PORT = process.env.PORT || 3100;

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") {
  app.get("*", (_, res) => {
    res.sendFile("build/index.html", { root: __dirname });
  });
}

app.use("/api", homeRouter);

// implement route for '/projects' endpoint
// '/projects' will prefix all post routes
// with '/projects' => '/all' will become '/projects/all'
app.use("/projects", projectsRouter);

app.use("/emotion-predictor", emotionPredictorRouter);

// implement route for errors
app.use((err, _, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/", (_, res) => res.sendStatus(404));

// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});
