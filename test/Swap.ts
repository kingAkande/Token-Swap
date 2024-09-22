import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";
import { token } from "../typechain-types/factories/@openzeppelin/contracts";
import { parseUnits } from "ethers";

describe("TokenSwap", function () {


  async function deployOlaToken() {

    const [owner, otherAccount] = await hre.ethers.getSigners();

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

    const{olaToken} = await loadFixture(deployOlaToken); 
    const{jubToken} = await loadFixture(deployJubToken);

    const TokenSwap = await hre.ethers.getContractFactory("TokenSwap");
    const tokenSwap = await TokenSwap.deploy();

    return {olaToken,jubToken, tokenSwap, owner, otherAccount , addr1 , addr2 };

  }



  describe("Deployment", function () {

    it("Should ensure that owner is msg.sender", async function () {

      const{ tokenSwap, owner } = await loadFixture(deployTokenSwap);

      expect (await tokenSwap.owner()).to.be.equal(owner);

    });

  });

  describe("depositToken" , function(){
    
      it("Should ensure there is enough allowance", async function () {

        const{jubToken,tokenSwap, olaToken} = await loadFixture(deployTokenSwap);

        const amountDEpo = ethers.parseUnits("100", 18);
        const amountINreturn = ethers.parseUnits("100", 18);

        await expect( tokenSwap.depositToken(jubToken, amountDEpo , olaToken, amountINreturn )).to.be.revertedWith("Not enough");

        //expect (await tokenSwap.orderCount()).to.equal(1);
      })


      it("Should ensure there is approval", async function () {

        const{jubToken,tokenSwap, olaToken} = await loadFixture(deployTokenSwap);

        const amountDEpo = ethers.parseUnits("100", 18);
        const amountINreturn = ethers.parseUnits("100", 18);

        await jubToken.approve(tokenSwap,amountDEpo);

        await expect( tokenSwap.depositToken(jubToken, amountDEpo , olaToken, amountINreturn ));

        //expect (await tokenSwap.orderCount()).to.equal(0);
        //expect (await jubToken.balanceOf(tokenSwap)).to.equal(amountDEpo); 
        
      })






  } )






});
