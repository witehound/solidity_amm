// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Pool {
    using SafeMath for uint256;
    using SafeMath for uint32;
    mapping(address => uint256) public balances;

    uint32 public slope;
    uint256 public totalSupply;

    constructor(uint256 _initialSupply, uint32 _initialSlope) {
        totalSupply = _initialSupply;
        slope = _initialSlope;
    }
}
