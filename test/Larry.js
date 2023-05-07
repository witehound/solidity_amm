const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Larry", function () {
  async function deploy() {
    const [owner, other1, other2, other3] = await ethers.getSigners();

    const Larry = await ethers.getContractFactory("LarryMeme");
    const larry = await Larry.deploy();

    return { larry, owner, other1, other2, other3 };
  }

  describe("airdrop", function () {
    it("deployer gets all tokens", async function () {
      const { larry, owner, other1, other2 } = await loadFixture(deploy);

      console.log("contracts address", larry.address);

      let deployerBalance = await larry.balanceOf(owner.address);

      deployerBalance = ethers.utils.formatUnits(
        deployerBalance.toString(),
        "18"
      );

      console.log(
        "all supply except the airdrop supply goes to deployers address",
        deployerBalance
      );

      expect(deployerBalance).to.equal("42152000000.0");
    });

    it("airdrop should not fail", async function () {
      const { larry, owner, other1, other2 } = await loadFixture(deploy);

      let zero = "0.0";

      let userOneBalance = ethers.utils.formatUnits(
        await larry.balanceOf(other1.address),
        "18"
      );

      let userTwoBalance = ethers.utils.formatUnits(
        await larry.balanceOf(other2.address),
        "18"
      );

      let firstAirdropUserOne = ethers.utils.parseUnits("50", 18);
      let firstAirdropUserTwo = ethers.utils.parseUnits("40", 18);

      console.log("reciever one balance", userOneBalance);

      console.log("reciever two balance", userTwoBalance);

      expect(userOneBalance).to.equal(zero);

      expect(userTwoBalance).to.equal(zero);

      await larry.airdrop(
        [other1.address, other2.address],
        [firstAirdropUserOne, firstAirdropUserTwo]
      );

      userOneBalance = ethers.utils.formatUnits(
        await larry.balanceOf(other1.address),
        "18"
      );

      userTwoBalance = ethers.utils.formatUnits(
        await larry.balanceOf(other2.address),
        "18"
      );

      expect(userOneBalance).to.equal(
        ethers.utils.formatUnits(firstAirdropUserOne, "18")
      );

      expect(userTwoBalance).to.equal(
        ethers.utils.formatUnits(firstAirdropUserTwo, "18")
      );

      await expect(
        larry.airdrop(
          [other1.address, other2.address],
          [ethers.utils.parseEther("0"), ethers.utils.parseEther("1847999910")]
        )
      ).to.not.be.reverted;

      await expect(
        larry.airdrop(
          [other1.address, other2.address],
          [ethers.utils.parseEther("1"), ethers.utils.parseEther("1")]
        )
      ).to.be.revertedWith("LR : exceeded airdrop limit");
    });
  });
});
