/* eslint-disable */

const { Conflux, util } = require('js-conflux-sdk');
require("dotenv").config();

const PRIVATE_KEY = process.env.CFX_PRIVATE_KEY;

async function main() {
  // const defaultGasPrice = util.unit("GDrip", "Drip")(10)

  const cfx = new Conflux({
    url: 'http://testnet-jsonrpc.conflux-chain.org:12537',
    logger: console,
  });

  // ================================ Account =================================
  const account = cfx.Account({privateKey: PRIVATE_KEY}); // create account instance
  console.log(account.address);

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi: require('./abi.json'), //can be copied from remix
    bytecode: require('./bytecode.json'), //on remix, found in compilation details => web3deploy => data (should be a hex string)
    // address is empty and wait for deploy
  });

  //get next nonce
  const nextNonce = await cfx.getNextNonce(account.address)
  console.log(Number(nextNonce));

  // deploy the contract, and get `contractCreated`
  const deployTransaction = contract.constructor();
  const receipt = await account.sendTransaction(deployTransaction).executed();
  console.log(receipt);

}

main().catch(e => console.error(e));
