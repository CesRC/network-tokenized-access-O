/* Token ERC20 - Smart Contract  */
pragma solidity ^0.5.7;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Token is ERC20 {
    using SafeMath for uint256;
    address public owner;
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 private _totalSupply;
    mapping (address => uint256) private balances;
    mapping (address => mapping (address => uint256)) private allowed;

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint128 _initialTotalSupply) public{
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        _totalSupply = _initialTotalSupply;
        balances[owner] = _totalSupply;
        emit Transfer(address(0), owner, _totalSupply);
    }
       
      /**
      * @dev Gets the total supply.
      * @return An uint256 representing the amount total supply.
      */
    function totalSupply() public view returns (uint256) {
            return _totalSupply;
    }

      /**
      * @dev Gets the balance of the specified address.
      * @param _tokenOwner The address to query the the balance of.
      * @return An uint256 representing the amount owned by the passed address.
      */
    function balanceOf(address _tokenOwner) public view returns (uint256) {
        return balances[_tokenOwner];
    }
    
    
          /**
      * @dev Transfer token for a specified address
      * @param _to The address to transfer to.
      * @param _value The amount to be transferred.
      */
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_value <= balances[msg.sender]);
        require(_to != address(0));
    
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
      /**
       * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
       * Beware that changing an allowance with this method brings the risk that someone may use both the old
       * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
       * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
       * @param _spender The address which will spend the funds.
       * @param _value The amount of tokens to be spent.
       */
    function approve(address _spender, uint256 _value) public returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
      /**
       * @dev Function to check the amount of tokens that an owner allowed to a spender.
       * @param _tokenOwner address The address which owns the funds.
       * @param _spender address The address which will spend the funds.
       * @return A uint256 specifying the amount of tokens still available for the spender.
       */
    function allowance(address _tokenOwner, address _spender) public view returns (uint256){
        return allowed[_tokenOwner][_spender];
    }
    
      /**
       * @dev Transfer tokens from one address to another
       * @param _from address The address which you want to send tokens from
       * @param _to address The address which you want to transfer to
       * @param _value uint256 the amount of tokens to be transferred
       */
    function transferFrom(address _from,address _to,uint256 _value) public returns (bool){
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);
        require(_to != address(0));
    
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }
    
      /**
       * @dev Increase the amount of tokens that an owner allowed to a spender.
       * approve should be called when allowed[_spender] == 0. To increment
       * allowed value is better to use this function to avoid 2 calls (and wait until
       * the first transaction is mined)
       * @param _spender The address which will spend the funds.
       * @param _addedValue The amount of tokens to increase the allowance by.
       */
    function increaseAllowance(address _spender,uint256 _addedValue) public returns (bool){
        allowed[msg.sender][_spender] = (
        allowed[msg.sender][_spender].add(_addedValue));
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }
    
      /**
       * @dev Decrease the amount of tokens that an owner allowed to a spender.
       * approve should be called when allowed[_spender] == 0. To decrement
       * allowed value is better to use this function to avoid 2 calls (and wait until
       * the first transaction is mined)
       * @param _spender The address which will spend the funds.
       * @param _subtractedValue The amount of tokens to decrease the allowance by.
       */
    function decreaseAllowance(address _spender, uint256 _subtractedValue) public returns (bool){
        uint256 oldValue = allowed[msg.sender][_spender];
        if (_subtractedValue >= oldValue) {
          allowed[msg.sender][_spender] = 0;
        } else {
          allowed[msg.sender][_spender] = oldValue.sub(_subtractedValue);
        }
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }

}