/* eslint-disable */

const { Conflux, util } = require("js-conflux-sdk");
require("dotenv").config();

const PRIVATE_KEY = process.env.CFX_PRIVATE_KEY;

async function main() {
  // const defaultGasPrice = util.unit("GDrip", "Drip")(10)

  const cfx = new Conflux({
    url: "http://mainnet-jsonrpc.conflux-chain.org:12537",
    logger: console,
  });

  // ================================ Account =================================
  const account = cfx.Account({ privateKey: PRIVATE_KEY }); // create account instance
  console.log(account.address);

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi: require("../bridgeContract/abi.json"), //can be copied from remix
    address: "0x812c1df5c8e69ffba7568c1100accfc982a081df",
  });

  // deploy the contract, and get `contractCreated`
  const tx = contract.newTx(
    "0x57F5dede4116DFd861f4736039bB914e84ac9651",
    "test(bytes32)",
    Buffer.from("test")
  );
  const receipt = await account.sendTransaction(tx).executed();
  console.log(receipt);
}

main().catch((e) => console.error(e));
