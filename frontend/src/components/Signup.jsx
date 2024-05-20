import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import Web3 from 'web3';
import ABI from "../ABI.json";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDataSeller, setIsDataSeller] = useState(false);
  const [isDataBuyer, setIsDataBuyer] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    const getAddress = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccountAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Error getting accounts: ", error);
        }
      } else {
        console.error('MetaMask is not enabled');
      }
    };
    getAddress();
  }, []);

  const web3 = new Web3(window.ethereum);
  const contractAddress = "0x87e73fd1833858D10F8cd2Ed65fdF5d921118C91";
  const contract = new web3.eth.Contract(ABI, contractAddress);

  const register = async (event) => {
    event.preventDefault();
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      await contract.methods.registerUser(accountAddress, name, isDataSeller, isDataBuyer, email, hashedPassword).send({ from: accountAddress });
      alert('User registered successfully');
      setIsUserSignedIn(true);
    } catch (error) {
      alert(`User registration failed: ${error.message}`);
    }
  };

  return (
    <section className="bg-white dark:bg-[#222831]">
      <div className="flex justify-center min-h-screen">
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={register}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm text-custom4 dark:text-gray-200">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John"
                  className="block w-full px-5 py-3 mt-2 text-custom4 placeholder-gray-400 bg-custom2 border border-custom3 rounded-lg dark:placeholder-gray-600 dark:bg-transparent dark:text-gray-300 dark:border-white focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email Id
                </label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-white rounded-lg dark:placeholder-gray-600 dark:bg-transparent dark:text-gray-300 dark:border-white focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm text-custom4 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-custom4 placeholder-gray-400 bg-custom2 border border-custom3 rounded-lg dark:placeholder-gray-600 dark:bg-transparent dark:text-gray-300 dark:border-white focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Account Address
                </label>
                <input
                  type="text"
                  placeholder="Account Address"
                  readOnly
                  value={accountAddress}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-transparent dark:text-gray-300 dark:border-white focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label htmlFor="dataSeller" className="block mb-2 text-sm text-custom4 dark:text-gray-200">
                  Data Seller
                </label>
                <input
                  type="checkbox"
                  id="dataSeller"
                  name="dataSeller"
                  checked={isDataSeller}
                  onChange={(e) => setIsDataSeller(e.target.checked)}
                  className="block w-full mt-2 text-custom4"
                />
              </div>

              <div>
                <label htmlFor="dataBuyer" className="block mb-2 text-sm text-custom4 dark:text-gray-200">
                  Data Buyer
                </label>
                <input
                  type="checkbox"
                  id="dataBuyer"
                  name="dataBuyer"
                  checked={isDataBuyer}
                  onChange={(e) => setIsDataBuyer(e.target.checked)}
                  className="block w-full mt-2 text-custom4"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-[10rem] px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#00ADB5] rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Sign Up
                </button>
                <p className="text-sm text-white">
                  Already have an account?
                  <a href="/login" className="text-[#00ADB5] focus:outline-none focus:underline hover:underline"> Login</a>.
                </p>
              </div>
            </form>

            {isUserSignedIn && (
              <p className="text-green-500 mt-4">User is signed in!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
