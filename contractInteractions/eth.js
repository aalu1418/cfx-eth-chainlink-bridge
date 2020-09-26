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
    "0x57F5dede4116DFd861f4736039bB914e84ac9651",
    "test(bytes32)",
    "0x00"
  );

  console.log(tx);
};

main().catch((error) => console.log(error));
