const express = require("express");
const bodyParser = require("body-parser");
const { Conflux } = require("js-conflux-sdk");
const { ethers } = require("ethers");
require("dotenv").config();
const app = express();
const port = 3000;

const CFX_PRIVATE_KEY = process.env.CFX_PRIVATE_KEY;

const cfx = new Conflux({
  url: "http://testnet-jsonrpc.conflux-chain.org:12537",
  logger: console,
});

const contract = cfx.Contract({
  abi: require("./bridgeContract/abi.json"), //can be copied from remix
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("CFX <=> ETH Chainlink Bridge Server Active");
});

app.post("/eth", async (req, res) => {
  console.log("ETH endpoint");
  const output = { id: req.body.id };
  const rawTx = req.body.data;
  console.log(rawTx);

  try {
    const data = ethers.utils.defaultAbiCoder.decode(
      ["address", "bytes4", "bytes"],
      rawTx.data
    );
    const tx = { to: data[0]};
    console.log(tx);

    const account = cfx.Account({ privateKey: CFX_PRIVATE_KEY }); // create account instance
    const receipt = await account.sendTransaction(tx).executed();

    res.status(200).send({...output, ...receipt});
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.post("/cfx", async (req, res) => {
  console.log("CFX endpoint", req.body);
  const output = { id: req.body.id };

  // ================================ Account =================================
  const account = cfx.Account({ privateKey: CFX_PRIVATE_KEY }); // create account instance
  console.log(account.address);

  const data = contract.abi.decodeLog(req.body.data);
  console.log(data.object);

  // // deploy the contract, and get `contractCreated`
  // const tx = contract.newTx(
  //   "0x57F5dede4116DFd861f4736039bB914e84ac9651",
  //   "0x12341234",
  //   "00000000000000000000000000000000"
  // );
  // const receipt = await account.sendTransaction(tx).executed();
  // console.log(receipt);

  res.status(200).send(output);
});

app.listen(port, () => {
  console.log(`External adapter started at http://localhost:${port}`);
});
