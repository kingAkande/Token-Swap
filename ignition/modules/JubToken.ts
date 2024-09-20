import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JubTokenModule = buildModule("JubTokenModule", (m) => {

  const jubToken = m.contract("JubToken");

  return { jubToken };
});

export default JubTokenModule;
