pragma solidity ^0.6.0;

contract Bridge {
    event Tx(address, bytes4, bytes);

    constructor() public {}

    function newTx(address _address, string calldata functionSignature, bytes calldata _data) external {
        bytes memory _functionSignature = bytes(functionSignature);
        bytes4 _functionId = bytes4(keccak256(_functionSignature));
        emit Tx(_address, _functionId, _data);
    }
}

//Ropsten deployment: 0x0dbda5f4ff57110b2b510c651ba773f61af9f837
//Conflux testnet deployment: 0x8c48bb7e715df67aa04fbbc15aaf92077fecd12d
