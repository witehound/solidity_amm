const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Pool", () => {
  it("should work", async () => {
    const [owner, otherAccounts] = await ethers.getSigners();
    const Pool = await ethers.getContractFactory("Pool");

    const initialSupply = ethers.utils.parseUnits("20", 8);
    const slope = 1;
    const pool = await Pool.deploy(initialSupply, slope);

    // await owner.sendTransaction({
    //   to: pool.address,
    //   value: ethers.utils.parseEther("30"),
    // });

    const tokenPrice = await pool.calculateTotalPrice();
    console.log("token price", tokenPrice);

    await pool.buy({ value: ethers.utils.parseEther("20.0") });

    const contractBalance = await ethers.provider.getBalance(pool.address);
    console.log("initial pool bal", contractBalance);

    const newTokenPrice = await pool.calculateTotalPrice();
    console.log("new token price", newTokenPrice);

    const balance = await pool.balances(owner.address);
    console.log("curr token bal", balance);

    await pool.sell(balance);

    // const priceAfterSales = await pool.calculateTotalPrice();
    // console.log("price after sales", priceAfterSales);

    // const balance2 = await pool.balances(owner.address);
    // console.log("bal after sales", balance2);
  });
});

// working on sbt prod
