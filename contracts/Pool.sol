// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Pool {
    using SafeMath for uint256;
    using SafeMath for uint32;
    mapping(address => uint256) public balances;

    uint32 public slope;
    uint256 public totalSupply;

    constructor(uint256 _initialSupply, uint32 _slope) {
        totalSupply = _initialSupply;
        slope = _slope;
    }

    function buy() public payable {
        require(msg.value > 0, "amount is to small");
        uint256 tokensToMint = calculateByReturns(msg.value);
        totalSupply = totalSupply.add(tokensToMint);
        uint256 currBal = balances[msg.sender];
        balances[msg.sender] = currBal.add(tokensToMint);
    }

    function calculateByReturns(
        uint256 _deposit
    ) public view returns (uint256) {
        uint256 tokenPrice = calculateTotalPrice();
        return _deposit / tokenPrice;
    }

    function calculateTotalPrice() public view returns (uint256) {
        uint256 temp = totalSupply.mul(totalSupply);
        return slope.mul(temp);
    }
}
