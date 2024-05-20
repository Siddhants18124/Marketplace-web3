import React, { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import UserRegistrationABI from "./ABI.json";

const Sell = () => {
  const [datasetName, setDatasetName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('category1');
  const [thumbnail, setThumbnail] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [accountAddress, setAccountAddress] = useState('');

  const pinataApiKey = '2f0f05a5c857118b4385';
  const pinataSecretApiKey = 'd28162053eb312653237b46b9b836ef29f7629ab8cfdc1963a5f480c5a2a0566';

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleDatasetChange = (e) => {
    setDataset(e.target.files[0]);
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccountAddress(accounts[0]);

        const contractAddress = "0x87e73fd1833858D10F8cd2Ed65fdF5d921118C91";
        const contract = new web3.eth.Contract(UserRegistrationABI.abi, contractAddress);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  const handleFileUpload = async (file) => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const thumbnailHash = await handleFileUpload(thumbnail);
      const datasetHash = await handleFileUpload(dataset);

      console.log('Thumbnail IPFS Hash:', thumbnailHash);
      console.log('Dataset IPFS Hash:', datasetHash);

      // Here you can send the IPFS hash and other form data to your smart contract or backend
      // For example:
      // await contract.methods.registerDataset(datasetName, description, price, category, thumbnailHash, datasetHash).send({ from: accountAddress });
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl my-10 text-custom4">Sell Your Data</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="py-5 rounded-3xl border ml-40 bg-custom1">
          <form className="max-w-lg mx-auto p-5" onSubmit={handleSubmit}>
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
            {/* Thumbnail Preview */}
            {/* Dataset Preview */}
          </div>
        </div>
      </>
    );
  };

  export default Sell;

