import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import ABI from "../ABI.json";

const Sell = () => {
  const [datasetName, setDatasetName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('category1');
  const [thumbnail, setThumbnail] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [accountAddress, setAccountAddress] = useState('');
  const [contractInstance, setContractInstance] = useState(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  const pinataApiKey = '46cf33ef8bb8b554b778';
  const pinataSecretApiKey = '491d9013584f64006c333eb0c6abcf1237665454bd29622cd1002de43cf70f16';

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleDatasetChange = (e) => {
    setDataset(e.target.files[0]);
  };

  useEffect(() => {
    const getAddress = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable(); // Request user permission to connect to MetaMask
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccountAddress(accounts[0]);
            const contractAddress = '0x87e73fd1833858D10F8cd2Ed65fdF5d921118C91';
            const contract = new web3.eth.Contract(ABI, contractAddress);
            setContractInstance(contract);
            setIsMetaMaskConnected(true);
          }
        } catch (error) {
          console.error('Error getting accounts:', error);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!contractInstance) {
      console.error('Contract is not initialized');
      return;
    }

    try {
      const datasetHash = await handleFileUpload(dataset);
      console.log('Dataset IPFS Hash:', datasetHash);
      await contract.methods.uploadDataSet(datasetName, description, datasetHash, price, false).send({ from: accountAddress });

      const thumbnailHash = await handleFileUpload(thumbnail);

      console.log('Thumbnail IPFS Hash:', thumbnailHash);
      console.log('Data sold successfully');
    } catch (error) {
      console.error('Error selling data:', error);
    }
  };


  const handleFileUpload = async (file) => {
    try {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      let data = new FormData();
      data.append('file', file);

      const res = await axios.post(url, data, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretApiKey,
        },
      });

      return res.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      throw error; // Rethrow the error to handle it in the caller function
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl my-10 text-custom4">Sell Your Data</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="py-5 rounded-3xl border ml-40 bg-custom1">
          <form className="max-w-lg mx-auto p-5" onSubmit={handleFormSubmit}>
            <div className="mb-5">
              <label htmlFor="datasetName" className="block mb-2 text-sm font-medium text-custom4 dark:text-white">Dataset Name</label>
              <input
                type="text"
                id="datasetName"
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
                className="bg-custom2 border border-gray-300 text-custom4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-custom4 dark:text-white">Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-custom2 block w-full p-4 text-custom4 border border-gray-300 rounded-lg text-base focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-custom4 dark:text-white">Price</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-custom2 block w-full p-2 text-custom4 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-custom4 dark:text-white">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-custom2 border border-gray-300 text-custom4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="category1">Medical</option>
                <option value="category2">Personal</option>
                <option value="category3">Financial</option>
              </select>
            </div>
            <div className="mb-5">
              <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-custom4 dark:text-white">Thumbnail</label>
              <input
                type="file"
                id="thumbnail"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              <label htmlFor="thumbnail" className="bg-custom2 border border-gray-300 text-custom4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer">
                Upload Thumbnail
              </label>
            </div>
            <div className="mb-5">
              <label htmlFor="dataset" className="block mb-2 text-sm font-medium text-custom4 dark:text-white">Dataset</label>
              <input
                type="file"
                id="dataset"
                accept=".csv,.json,.xml"
                onChange={handleDatasetChange}
                className="hidden"
              />
              <label htmlFor="dataset" className="bg-custom2 border border-gray-300 text-custom4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer">
                Upload Dataset
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sell Data
            </button>
          </form>
        </div>
        <div className="py-5 rounded-lg">
        </div>
      </div>
    </>
  );
};

export default Sell;

