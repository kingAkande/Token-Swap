// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JubToken is ERC20("JubToken", "JBK"){

    address public owner;

    constructor() {
        owner = msg.sender;
        _mint(msg.sender, 20000e18);
    }
   
    function mint(uint256 amount) external  {
        require(msg.sender == owner, "not owner");
        _mint(msg.sender, amount*1e18);
    }
}

// JubTokenModule#JubToken - 0xD8bb7E8405Ebadf298e9CCEFEb80AC0E7f559710

//  https://sepolia-blockscout.lisk.com//address/0xD8bb7E8405Ebadf298e9CCEFEb80AC0E7f559710#code