# cfx-eth-chainlink-bridge

Components
- Chainlink Node
- External Initiator
- External Adapter
- Conflux Network Endpoint
- Ethereum Network Endpoint
- PostgreSQL Database (x2)
- On-Chain Smart Contract

.env File
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
CHAINLINK_DEV=true
ETH_URL=CHANGEME
```

```
cd ~/.chainlink-ropsten && docker run -p 6688:6688 -v ~/.chainlink-ropsten:/chainlink -it --env-file=.env smartcontract/chainlink local n -p /chainlink/.password -a /chainlink/.api
```

Resource Links
- https://docs.chain.link/docs/running-a-chainlink-node
- https://docs.chain.link/docs/miscellaneous#use-password-and-api-files-on-startup

Notes
- send ETH to node address
