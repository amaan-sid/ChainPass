import { ethers } from "ethers";
import abi from "./abi.json";

const CONTRACT_ADDRESS = "0x80d72D922Ee0Bfa23A5ceB1093D00A1B06c186C4";

export const getProvider = async () => {
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  } else {
    alert("Please install MetaMask!");
    return null;
  }
};

export const getSigner = async () => {
  const provider = await getProvider();
  return await provider.getSigner();
};

export const getContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
};

export const getTicketContract = getContract;
