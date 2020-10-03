const { Conflux, util } = require("js-conflux-sdk");
const { ethers } = require("ethers");
require("dotenv").config();

const main = async () => {
  await getEthState();
  await getCfxState();
};

const getEthState = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.ETH_ENDPOINT
  );
  const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);

  const contract = new ethers.Contract(
    "0x296e0cacd23d37ceb5f2bea806bcf37e4b055ec6",
    require("../targetContract/abi.json"),
    wallet
  );

  const state = await contract.state();
  console.log("ETH state: ", String(state));
}

const getCfxState = async () => {
  const cfx = new Conflux({
    url: "http://mainnet-jsonrpc.conflux-chain.org:12537",
  });

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi: require("../targetContract/abi.json"), //can be copied from remix
    address: "0x861dc585b3d7b156da39d8d7b7a70c1fbcedfd04",
  });

  const state = await contract.state();
  console.log("CFX State: ", String(state));
}

main().catch((e) => console.error(e));
