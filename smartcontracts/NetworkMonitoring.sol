pragma solidity ^0.5.7;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract InternetTok{
    using SafeMath for uint256;

    address public owner;
    string public name;
    uint128 networkBandwidth;
    uint128 totalConsumption;
    mapping (string => uint128) private _userConsumption; //ip --> consumo

    constructor(string memory _name, uint128 _networkBandwidth) public{
        owner = msg.sender;
        name = _name;
        networkBandwidth = _networkBandwidth;
    }
    
    function setTotalConsumption(uint128 _consumption) public{
        totalConsumption = _consumption;
    }
    
    function getTotalConsumption() public view returns (uint128){
        return totalConsumption;
    }

    function setUserConsumption(string memory _ipAddress, uint128 _consumption) public{
        _userConsumption[_ipAddress] = _consumption;
    }

    function getUserConsumption(string memory _ipAddress) public view returns (uint128){
        return _userConsumption[_ipAddress];
    }

}