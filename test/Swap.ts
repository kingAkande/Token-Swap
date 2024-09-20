import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("TokenSwap", function () {


  async function deployOlaToken() {

    const [owner, otherAccount , ] = await hre.ethers.getSigners();

    const OlaToken = await hre.ethers.getContractFactory("OlaToken");
    const olaToken = await OlaToken.deploy();

    return { olaToken, owner, otherAccount };
  }


  async function deployJubToken() {

    const [owner, otherAccount , ] = await hre.ethers.getSigners();

    const JubToken = await hre.ethers.getContractFactory("JubToken");
    const jubToken = await JubToken.deploy();

    return { jubToken, owner, otherAccount };

  }


  async function deployTokenSwap() {

    const [owner, otherAccount, addr1 , addr2] = await hre.ethers.getSigners();

    const TokenSwap = await hre.ethers.getContractFactory("TokenSwap");
    const tokenSwap = await TokenSwap.deploy();

    const {olaToken} = await loadFixture(deployOlaToken);
    
    const{jubToken} = await loadFixture(deployJubToken);

    return {olaToken,jubToken, tokenSwap, owner, otherAccount , addr1 , addr2 };

  }

  describe("Deployment", function () {

    it("Should ensure that owner is msg.sender", async function () {

      const{ tokenSwap, owner } = await loadFixture(deployTokenSwap);

    expect (await tokenSwap.owner()).to.be.equal(owner);

    });

  });

  describe("depositToken" , function(){
    it("Should ensure olaToken is an ERC20 token", async function () {

      const{olaToken , tokenSwap} = await loadFixture(deployTokenSwap);
      

      expect (await olaToken.balanceOf("0x812BBC36857434A0B060464679E5B7Fcf81dD74B"));
      const balance = await olaToken.balanceOf("0x812BBC36857434A0B060464679E5B7Fcf81dD74B");
      console.log(`Balance: ${balance.toString()}`); 

    })

    it("Should ensure olaToken is an ERC20 token", async function () {

      const{jubToken} = await loadFixture(deployTokenSwap);

      expect (await jubToken.balanceOf("0xD8bb7E8405Ebadf298e9CCEFEb80AC0E7f559710"));
      const balance = await jubToken.balanceOf("0xD8bb7E8405Ebadf298e9CCEFEb80AC0E7f559710");
      console.log(`Balance: ${balance.toString()}`); 

    })

    it("Should ensure token balance is not zero", async function () {

      const{jubToken,tokenSwap} = await loadFixture(deployTokenSwap);

      const amountDEpo = ethers.parseUnits("100", 18);

      await jubToken.transfer( tokenSwap , amountDEpo);

      await expect( jubToken.transfer( tokenSwap , amountDEpo)).to.be.revertedWith("Insufficient amount"); 


    })

    




  } )






});
