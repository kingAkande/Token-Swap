// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract TokenSwap {

    uint256 orderCount;
    address owner;

    constructor(){
        owner = msg.sender;
    }

struct Order {
    address tokenDeposited;
    address tokenRequested;
    uint256 amountDeposited;
    uint256 amountInReturn;
}

    
    mapping (uint256 => Order) swapOrder;

    event DoneSwap(  uint256 indexed orderId,address indexed user,  address tokenDeposited, uint256 amountDeposited,  address tokenRequested,  uint256 amountInReturn);
   


   function depositToken( uint256 _amountDeposited, uint256 _amountInReturn, address _tokenDeposited,  address _tokenRequested) external {

    IERC20 token = IERC20(_tokenDeposited);
    require(token.balanceOf(msg.sender) >= _amountDeposited, "Insufficient amount");
    require(token.allowance(msg.sender, address(this)) >= _amountDeposited, "Not enough");
    
    uint256 _id = orderCount + 1;

    token.transferFrom(msg.sender, address(this), _amountDeposited);
    
    Order storage oRD = swapOrder[_id];
    oRD.amountDeposited = _amountDeposited;
    oRD.amountInReturn = _amountInReturn;
    oRD.tokenDeposited = _tokenDeposited;
    oRD.tokenRequested = _tokenRequested;
    orderCount++;
}


function swapToken(uint256 _orderId) external {
    
    Order memory order = swapOrder[_orderId];
    require(order.amountDeposited > 0, "order complitted");

    address tokenDeposited = order.tokenDeposited;
    address tokenRequested = order.tokenRequested;
    uint256 amountDeposited = order.amountDeposited;
    uint256 amountInReturn = order.amountInReturn;

    
    require(IERC20(tokenRequested).balanceOf(msg.sender) >= amountInReturn, "Insufficient balance");
    require(IERC20(tokenRequested).allowance(msg.sender, address(this)) >= amountInReturn, "Not enough");
    require(IERC20(tokenDeposited).balanceOf(address(this)) >= amountDeposited, "contract balance not enough");

    // Transfer tokens
    IERC20(tokenRequested).transferFrom(msg.sender, address(this), amountInReturn);
    IERC20(tokenDeposited).transfer(msg.sender, amountDeposited);

    delete swapOrder[_orderId];


    emit DoneSwap(_orderId, msg.sender, tokenDeposited, amountDeposited, tokenRequested, amountInReturn);
}



}
