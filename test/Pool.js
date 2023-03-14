const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Pool", () => {
  it("should work", async () => {
    const [owner, otherAccounts] = await ethers.getSigners();
    const Pool = await ethers.getContractFactory("Pool");

    const initialSupply = ethers.utils.parseUnits("100", 8);
    const slope = 1;
    const pool = await Pool.deploy(initialSupply, slope);
    const tokenPrice = await pool.calculateTotalPrice();
    console.log("tokenprice", tokenPrice);
  });
});
