// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Pool is ERC20 {
    using SafeMath for uint256;
    using SafeMath for uint32;
    mapping(address => uint256) public balances;

    uint32 public slope;

    constructor(uint256 _initialSupply, uint32 _slope) {
        _mint(address(this), _initialSupply);

        slope = _slope;
    }

    function buy() public payable {
        require(msg.value > 0, "amount is to small");

        uint256 tokensToMint = calculateBuyReturns(msg.value);

        _mint(msg.sender, tokensToMint);
    }

    function sell(uint256 _tokens) public {
        uint256 bl = balanceOf(msg.sender);
        require(bl >= _tokens, "not enough tokens");

        _burn(msg.sender, _tokens);

        uint256 ethReturn = calculateSellReturn(_tokens);

        require(
            address(this).balance >= ethReturn,
            "not enough eth to send to seller"
        );

        payable(msg.sender).transfer(ethReturn);
    }

    function calculateBuyReturns(
        uint256 _deposit
    ) public view returns (uint256) {
        uint256 tokenPrice = calculateTotalPrice();

        return _deposit.div(tokenPrice);
    }

    function calculateTotalPrice() public view returns (uint256) {
        uint256 totalSupply = totalSupply();
        uint256 temp = totalSupply.mul(totalSupply);
        return slope.mul(temp);
    }

    function calculateSellReturn(
        uint256 _tokens
    ) public view returns (uint256) {
        uint256 cp = calculateTotalPrice();
        return _tokens.mul(cp);
    }

    receive() external payable {}
}
