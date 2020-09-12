pragma solidity ^0.6.0;

contract Bridge {
    event Tx(bytes data);

    function newTx(address _address, string calldata functionSignature, bytes32 _data) external {
        bytes memory _functionSignature = bytes(functionSignature);
        bytes4 _functionId = bytes4(keccak256(_functionSignature));
        emit Tx(abi.encode(_address, _functionId, _data));
    }
}

//Ropsten deployment: 0x57F5dede4116DFd861f4736039bB914e84ac9651
//Conflux testnet deployment: 
