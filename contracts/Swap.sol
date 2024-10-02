// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract TokenSwap {

    uint256 public orderCount;
    address public owner;

    constructor(){
        owner = msg.sender;
    }

struct Order {
    uint256 orderID;
    address tokenDeposited;
    address tokenRequested;
    uint256 amountDeposited;
    uint256 amountInReturn;
}


    
    mapping (uint256 => Order) swapOrder;

    event DoneSwap(  uint256 indexed orderId,address indexed user,  address tokenDeposited, uint256 amountDeposited,  address tokenRequested,  uint256 amountInReturn);
   


   function depositToken( address _tokenDeposited, uint256 _amountDeposited, address _tokenRequested, uint256 _amountInReturn) external {

    IERC20 token = IERC20(_tokenDeposited);
    require(token.balanceOf(msg.sender) >= _amountDeposited, "Insufficient amount");
    require(token.allowance(msg.sender, address(this)) >= _amountDeposited, "Not enough");

    token.transferFrom(msg.sender, address(this), _amountDeposited);

    uint256 _id = orderCount + 1;
    Order storage oRD = swapOrder[_id];
    oRD.orderID = _id;
    oRD.amountDeposited = _amountDeposited;
    oRD.amountInReturn = _amountInReturn;
    oRD.tokenDeposited = _tokenDeposited;
    oRD.tokenRequested = _tokenRequested;

    orderCount++;
}


function swapToken(uint256 _id) external {
    
    Order storage oRD = swapOrder[_id];

    require(oRD.orderID != 0 , "Null Order");
    require(oRD.amountDeposited > 0, "No Zero Deposit");
    
    require(IERC20(oRD.tokenRequested).balanceOf(msg.sender) >= oRD.amountInReturn, "Insufficient balance");
    require(IERC20(oRD.tokenRequested).allowance(msg.sender, address(this)) >= oRD.amountInReturn, "Not enough");
    require(IERC20(oRD.tokenDeposited).balanceOf(address(this)) >= oRD.amountDeposited, "contract balance not enough");

    // Transfer tokens
    IERC20(oRD.tokenRequested).transferFrom(msg.sender, address(this), oRD.amountInReturn);
    IERC20(oRD.tokenDeposited).transfer(msg.sender, oRD.amountDeposited);

    delete swapOrder[_id];


    emit DoneSwap(_id, msg.sender, oRD.tokenDeposited, oRD.amountDeposited, oRD.tokenRequested, oRD.amountInReturn);
}



}
