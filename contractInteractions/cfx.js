/* eslint-disable */

const { Conflux, util } = require("js-conflux-sdk");
require("dotenv").config();

const PRIVATE_KEY = process.env.CFX_PRIVATE_KEY;

async function main() {
  // const defaultGasPrice = util.unit("GDrip", "Drip")(10)

  const cfx = new Conflux({
    url: "http://testnet-jsonrpc.conflux-chain.org:12537",
    logger: console,
  });

  // ================================ Account =================================
  const account = cfx.Account({ privateKey: PRIVATE_KEY }); // create account instance
  console.log(account.address);

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi: require("../bridgeContract/abi.json"), //can be copied from remix
    address: "0x85e4e7341abbe1bb6c860399bc4c503058e13346",
  });

  // deploy the contract, and get `contractCreated`
  const tx = contract.newTx(
    "0x57F5dede4116DFd861f4736039bB914e84ac9651",
    "0x12341234",
    "00000000000000000000000000000000"
  );
  const receipt = await account.sendTransaction(tx).executed();
  console.log(receipt);
}

main().catch((e) => console.error(e));
