const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Pool", () => {
  it("should work", async () => {
    const [owner, otherAccounts] = await ethers.getSigners();
    const Pool = await ethers.getContractFactory("Pool");

    const initialSupply = ethers.utils.parseUnits("20", 18);
    const slope = 1;
    const pool = await Pool.deploy(initialSupply, slope);
    const tokenPrice = await pool.calculateTotalPrice();
    console.log("token price", tokenPrice);

    await pool.buy({ value: ethers.utils.parseUnits("1", 18) });
    const newTokenPrice = await pool.calculateTotalPrice();
    console.log("new token price", newTokenPrice);
    const balances = await pool.balances(owner.address);
    console.log("bal", balances);
  });
});
