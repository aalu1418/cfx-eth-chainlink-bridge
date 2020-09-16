# CFX <=> ETH Chainlink Bridge

Simple project send transactions to/from Conflux Network to/from Ethereum - deployed on the Conflux testnet and the Ropsten testnet.

**Components**

- Chainlink Node
- External Initiator
- External Adapter for ETH & CFX
- Conflux Network Endpoint
- Ethereum Network Endpoint
- PostgreSQL Database (x2)
- On-Chain Smart Contracts

## Technical Details

### Starting a Chainlink node

Follow the instructions here: : https://docs.chain.link/docs/running-a-chainlink-node

`.env` file for starting the Chainlink node (added: `FEATURE_EXTERNAL_INITIATORS=true`)

```
ROOT=/chainlink
LOG_LEVEL=debug
ETH_CHAIN_ID=3
MIN_OUTGOING_CONFIRMATIONS=2
LINK_CONTRACT_ADDRESS=0x20fe562d797a42dcb3399062ae9546cd06f63280
CHAINLINK_TLS_PORT=0
SECURE_COOKIES=false
ALLOW_ORIGINS=*
DATABASE_TIMEOUT=0
DATABASE_URL=DATABASE_URL=postgresql://$USERNAME:$PASSWORD@$SERVER:$PORT/$DATABASE
FEATURE_EXTERNAL_INITIATORS=true
ETH_URL=CHANGEME
```

Start up command without password files:

```bash
cd ~/.chainlink-ropsten && docker run -p 6688:6688 -v ~/.chainlink-ropsten:/chainlink -it --env-file=.env smartcontract/chainlink local n -p /chainlink/.password -a /chainlink/.api

```

Star up command with password files:  
[Setup details](https://docs.chain.link/docs/miscellaneous#use-password-and-api-files-on-startup)

```bash
cd ~/.chainlink-ropsten && docker run -p 6688:6688 -v ~/.chainlink-ropsten:/chainlink -it --env-file=.env smartcontract/chainlink local n -p /chainlink/.password -a /chainlink/.api
```

### Setting up external initiator

Connecting the external initiator (EI) to Chainlink node.

Get the container ID using `docker ps`

```bash
docker exec -it <containerID> /bin/bash
chainlink admin login
chainlink initiator create cfx http://172.17.0.1:8080/jobs
```

Add the generated access tokens `./external-initiator/.env`

```bash
EI_DATABASEURL=postgresql://$USERNAME:$PASSWORD@$SERVER:$PORT/$DATABASE
EI_CHAINLINKURL=http://localhost:6688
EI_IC_ACCESSKEY=<INSERT KEY>
EI_IC_SECRET=<INSERT KEY>
EI_CI_ACCESSKEY=<INSERT KEY>
EI_CI_SECRET=<INSERT KEY>
```

Initial startup:

```bash
./external-initiator "{\"name\":\"cfx-testnet\",\"type\":\"conflux\",\"url\":\"http://testnet-jsonrpc.conflux-chain.org:12537\"}" --chainlinkurl "http://localhost:6688/"
```

Normal startup command:

```bash
./external-initiator
```

### Setting up the external adapter

Login to the [Chainlink node](https://localhost:6688) and add two bridges:
| -- | -- |
| cfxTx | http://172.17.0.1:3000/cfx |
| ethTxCustom | http://172.17.0.1:3000/eth |

The external adapter can be started with `yarn start-adapter`.

### Starting the job specs

## Notes

- need to send ETH to node address
- CL node only sends 32 bytes of data in a ethtx transaction
