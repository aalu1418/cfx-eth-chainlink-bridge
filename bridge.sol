pragma solidity ^0.6.0;

contract Bridge {
    address chainlink;
    event Tx(bytes data);

    constructor (address _chainlink) public {
        chainlink = _chainlink;
    }

    function newTx(address _address, bytes4 _functionId, bytes32 _data) external {
        emit Tx(abi.encode(_address, _functionId, _data));
    }

    function relay(address _address, bytes4 _functionId, bytes32 _data) external {
        require(msg.sender == chainlink, "not chainlink node");
        (bool success, ) = _address.call(abi.encodeWithSelector(_functionId, _data));
        require(success == true, "transaction failed");
    }
}

contract TestContract {
    address public bridge;
    bytes32 public data;

    constructor (address _bridge) public {
        bridge = _bridge;
    }

    function trigger (bytes32 _data) external {
        Bridge bc = Bridge(bridge);
        bc.newTx(address(this), bytes4(keccak256("returnFunction(bytes32)")),_data);
    }

    function returnFunction (bytes32 _data) external{
        require(msg.sender == bridge);
        data = _data;
    }
}
