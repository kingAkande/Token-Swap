import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const OlaTokenModule = buildModule("OlaTokenModule", (m) => {

  const olaToken = m.contract("OlaToken");

  return { olaToken };
});

export default OlaTokenModule;


/** OlaTokenModule#OlaToken - 0x812BBC36857434A0B060464679E5B7Fcf81dD74B 
  
 *  https://sepolia-blockscout.lisk.com//address/0x812BBC36857434A0B060464679E5B7Fcf81dD74B#code
*/