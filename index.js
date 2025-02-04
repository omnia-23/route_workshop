import express from "express";
import bootstrap from "./src/app.controller.js";
import cors from "cors";
const app = express();
const port = 5000;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions), (req, res, next) => {
  console.log(req.url, req.method);
  next();
});


bootstrap(app, express);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
