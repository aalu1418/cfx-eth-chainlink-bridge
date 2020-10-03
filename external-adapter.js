const express = require("express");
const bodyParser = require("body-parser");
const { Conflux } = require("js-conflux-sdk");
const { ethers } = require("ethers");
require("dotenv").config();
const app = express();
const port = 3000;

const cfx = new Conflux({
  url: "http://mainnet-jsonrpc.conflux-chain.org:12537",
  // logger: console,
});
const cfxWallet = cfx.Account({ privateKey: process.env.CFX_PRIVATE_KEY }); // create account instance

const eth = new ethers.providers.JsonRpcProvider(process.env.ETH_ENDPOINT);
const ethWallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, eth);

const createTx = (rawData) => {
  const data = ethers.utils.defaultAbiCoder.decode(
    ["address", "bytes4", "bytes"],
    rawData
  );
  const tx = { to: data[0], data: data[1] + data[2].slice(2) };
  return tx;
};

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("CFX <=> ETH Chainlink Bridge Server Active");
});

app.post("/eth", async (req, res) => {
  console.log("ETH endpoint");
  const output = { id: req.body.id };

  try {
    const tx = createTx(req.body.data.data);
    const receipt = await ethWallet.sendTransaction(tx);
    res
      .status(200)
      .send({ ...output, data: { ...receipt }, result: receipt.hash });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.post("/cfx", async (req, res) => {
  console.log("CFX endpoint");
  const output = { id: req.body.id };

  try {
    const tx = createTx(req.body.data.data);
    const receipt = await cfxWallet.sendTransaction(tx).executed();
    res
      .status(200)
      .send({ ...output, data: { ...receipt }, result: receipt.transactionHash });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`External adapter started at http://localhost:${port}`);
});
