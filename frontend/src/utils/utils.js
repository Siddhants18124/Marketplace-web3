import Web3 from 'web3';

// Create a single instance of Web3
const web3 = new Web3(window.ethereum);

// Function to hash the password using Web3
const hashPassword = (password) => {
  return web3.utils.sha3(password);
};

export { hashPassword };