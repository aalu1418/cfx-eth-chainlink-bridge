pragma solidity ^0.6.0;

contract Target {
    uint256 public state;

    constructor () public {}

    function setState(uint256 _state) external {
        state = _state;
    }
}

//Ropsten deployment: 0x296e0cacd23d37ceb5f2bea806bcf37e4b055ec6
//Conflux Oceanus deployment: 0x861dc585b3d7b156da39d8d7b7a70c1fbcedfd04
