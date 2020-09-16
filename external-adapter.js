const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("CFX <=> ETH Chainlink Bridge Server Active");
});

app.post("/eth", (req, res) => {
  console.log("ETH endpoint", req.body);
  const output = { id: req.body.id };
  res.status(200).send(output);
});

app.post("/cfx", (req, res) => {
  console.log("CFX endpoint", req.body);
  const output = { id: req.body.id };
  res.status(200).send(output);
});

app.listen(port, () => {
  console.log(`External adapter started at http://localhost:${port}`);
});
