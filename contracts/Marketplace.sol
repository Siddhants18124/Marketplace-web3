// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// remixd -s . --remix-ide https://remix.ethereum.org
// Data hash 0xe000f0a800000000000000000000000000000000000000000000000000000000
contract DataMarketplace {
    struct User {
        string name;
        string email;
        bool isDataSeller;
        bool isDataBuyer;
    }

    struct DataSet {
        string name;
        string description;
        bytes32 dataHash;
        uint256 price;
        bool isEncrypted;
        address payable seller;
        uint256 reportCount; // New field to track reports for the dataset
    }

    struct SellerReputation {
        uint256 totalRatings;
        uint256 sumOfRatings;
    }

    struct ReportedUser {
        uint256 reportCount;
        bool isBanned;
    }

    mapping(address => ReportedUser) public reportedUsers;
    mapping(address => User) public users;
    mapping(uint256 => DataSet) public dataSets;
    mapping(bytes32 => uint256) public dataHashToDataSetId;
    mapping(address => SellerReputation) public sellerReputations;
    uint256 public dataSetCount;
    address payable public platformOwner;
    uint256 public constant PLATFORM_FEE_PERCENTAGE = 100;

    event UserRegistered(
        address indexed user,
        string name,
        string email,
        bool isDataSeller,
        bool isDataBuyer
    );
    event DataSetUploaded(
        uint256 indexed dataSetId,
        string name,
        uint256 price,
        address indexed seller
    );
    event DataSetPurchased(
        uint256 indexed dataSetId,
        address indexed buyer,
        uint256 price,
        bytes32 dataHash
    );

    constructor() {
        platformOwner = payable(msg.sender);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}

    function registerUser(
        string memory _name,
        string memory _email,
        bool _isDataSeller,
        bool _isDataBuyer
    ) public {
        require(
            !users[msg.sender].isDataSeller && !users[msg.sender].isDataBuyer,
            "User already registered"
        );
        users[msg.sender] = User(_name, _email, _isDataSeller, _isDataBuyer);
        emit UserRegistered(
            msg.sender,
            _name,
            _email,
            _isDataSeller,
            _isDataBuyer
        );
    }

    function uploadDataSet(
        string memory _name,
        string memory _description,
        bytes32 _dataHash,
        uint256 _price,
        bool _isEncrypted
    ) public {
        require(
            users[msg.sender].isDataSeller,
            "Only registered data sellers can upload data sets"
        );
        require(!reportedUsers[msg.sender].isBanned, "User is banned");

        require(
            dataHashToDataSetId[_dataHash] == 0,
            "Data set with the same hash already exists"
        );

        dataSets[dataSetCount] = DataSet(
            _name,
            _description,
            _dataHash,
            _price,
            _isEncrypted,
            payable(msg.sender),
            0 // Initialize reportCount to 0
        );
        dataHashToDataSetId[_dataHash] = dataSetCount;

        emit DataSetUploaded(dataSetCount, _name, _price, msg.sender);
        dataSetCount++;
    }

    function purchaseDataSet(uint256 _dataSetId) public payable {
        require(
            users[msg.sender].isDataBuyer,
            "Only registered data buyers can purchase data sets"
        );
        require(!reportedUsers[msg.sender].isBanned, "User is banned");

        DataSet storage dataSet = dataSets[_dataSetId];
        require(dataSet.seller != address(0), "Invalid data set ID");

        require(msg.value >= dataSet.price, "Incorrect payment amount");

        uint256 platformFee = (dataSet.price * PLATFORM_FEE_PERCENTAGE) / 100;
        uint256 sellerAmount = dataSet.price - platformFee;

        platformOwner.transfer(platformFee);
        dataSet.seller.transfer(sellerAmount);

        emit DataSetPurchased(
            _dataSetId,
            msg.sender,
            dataSet.price,
            dataSet.dataHash
        );
    }

    function rateSeller(uint256 _dataSetId, uint256 _rating) public {
        require(
            users[msg.sender].isDataBuyer,
            "Only registered data buyers can rate sellers"
        );
        DataSet storage dataSet = dataSets[_dataSetId];
        require(msg.sender != dataSet.seller, "Sellers cannot rate themselves");

        SellerReputation storage reputation = sellerReputations[dataSet.seller];
        reputation.totalRatings++;
        reputation.sumOfRatings += _rating;
    }

    function getSellerAverageRating(address _seller)
        public
        view
        returns (uint256)
    {
        SellerReputation storage reputation = sellerReputations[_seller];
        if (reputation.totalRatings == 0) {
            return 0;
        }
        return reputation.sumOfRatings / reputation.totalRatings;
    }

    function reportUser(address _user) public {
        require(_user != msg.sender, "Cannot report yourself");
        require(users[_user].isDataSeller || users[_user].isDataBuyer, "User not registered");

        reportedUsers[_user].reportCount++;
    }

    function reportDataSet(uint256 _dataSetId) public {
        DataSet storage dataSet = dataSets[_dataSetId];
        require(dataSet.seller != address(0), "Invalid data set ID");

        dataSet.reportCount++;
    }

    function banUser(address _user) public {
        require(msg.sender == platformOwner, "Only platform owner can ban users");
        require(users[_user].isDataSeller || users[_user].isDataBuyer, "User not registered");

        reportedUsers[_user].isBanned = true;
    }

    function getDataSet(uint256 _dataSetId)
        public
        view
        returns (
            string memory,
            string memory,
            bytes32,
            uint256,
            bool,
            address,
            uint256
        )
    {
        DataSet storage dataSet = dataSets[_dataSetId];
        return (
            dataSet.name,
            dataSet.description,
            dataSet.dataHash,
            dataSet.price,
            dataSet.isEncrypted,
            dataSet.seller,
            dataSet.reportCount
        );
    }

    function getReportedUsers() public view returns (address[] memory) {
        require(msg.sender == platformOwner, "Only platform owner can access reported users");
        address[] memory reportedUserAddresses = new address[](dataSetCount);
        uint256 index = 0;
        for (uint256 i = 0; i < dataSetCount; i++) {
            if (reportedUsers[dataSets[i].seller].reportCount > 0) {
                reportedUserAddresses[index] = dataSets[i].seller;
                index++;
            }
        }
        return reportedUserAddresses;
    }
}