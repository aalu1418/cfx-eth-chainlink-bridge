const { ethers } = require("ethers");
require("dotenv").config();

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.ETH_ENDPOINT
  );
  const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);

  const contract = new ethers.Contract(
    "0x0dbda5f4ff57110b2b510c651ba773f61af9f837",
    require("../bridgeContract/abi.json"),
    wallet
  );

  const tx = await contract.newTx(
    "0x861dc585b3d7b156da39d8d7b7a70c1fbcedfd04",
    "setState(uint256)",
    "0x0000000000000000000000000000000000000000000000000000000000000080"
  );

  console.log(tx);
};

main().catch((error) => console.log(error));
