const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Pool", () => {
  it("should work", async () => {
    const [owner, otherAccounts] = await ethers.getSigners();
    const Pool = await ethers.getContractFactory("Pool");

    const initialSupply = 100;
    const slope = 1;
    const pool = await Pool.deploy(initialSupply, initialSlope);
  });
});

// was working on rembarndt
