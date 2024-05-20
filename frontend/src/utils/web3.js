import Web3 from 'web3';
import UserRegistrationABI from "../ABI.json";

let web3;
let contract;

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      // Request access to user's MetaMask accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create a new Web3 instance using the MetaMask provider
      web3 = new Web3(window.ethereum);

      const contractAddress = "0x87e73fd1833858D10F8cd2Ed65fdF5d921118C91";

      // Initialize contract instance
      contract = new web3.eth.Contract(UserRegistrationABI.abi, contractAddress);

      return { web3, contract };
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return { web3: null, contract: null };
    }
  } else {
    console.error('MetaMask is not installed');
    return { web3: null, contract: null };
  }
};

const isMetaMaskInstalled = () => {
  return Boolean(window.ethereum);
};

export { web3, contract, connectWallet, isMetaMaskInstalled };
