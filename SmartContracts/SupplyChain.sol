// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SupplyChain {
    address public owner;

    struct TrashCan {
        uint weight;
        bool collected;
    }

    struct CollectionCenter {
        uint totalWeight;
        address[] societyAddresses;
        mapping(address => uint) societyWeights;
    }

    struct MunicipalCorporation {
        address[] collectionCenterAddresses;
        mapping(address => bool) isCollectionCenter;
    }

    mapping(address => CollectionCenter) internal collectionCenters;
    mapping(address => MunicipalCorporation) internal municipalCorporations;

    event TrashCanCollected(address society, uint weight);
    event CollectionCenterWeightUpdated(address collectionCenter, uint weight);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function submitTrashCanWeight(uint _weight, address _collectionCenter) external {
        require(!(collectionCenters[_collectionCenter].societyWeights[msg.sender] > 0), "Trash can already collected for this society and collection center");

        collectionCenters[_collectionCenter].societyWeights[msg.sender] = _weight;
        collectionCenters[_collectionCenter].totalWeight += _weight;

        // Add the society's address to the collection center's societyAddresses array if not already added
        if (!contains(collectionCenters[_collectionCenter].societyAddresses, msg.sender)) {
            collectionCenters[_collectionCenter].societyAddresses.push(msg.sender);
        }

        emit TrashCanCollected(msg.sender, _weight);
    }

    function submitCollectionCenterWeight(uint _weight, address _collectionCenter) external onlyOwner {
        //require(_weight == calculateTotalGroupWeight(_collectionCenter), "Total weight does not match the sum of group weights");

        collectionCenters[_collectionCenter].totalWeight = _weight;

        emit CollectionCenterWeightUpdated(_collectionCenter, _weight);
    }

    function checkWeightConsistency(address _collectionCenter) external view returns (bool) {
        return collectionCenters[_collectionCenter].totalWeight == calculateTotalGroupWeight(_collectionCenter);
    }

    function calculateTotalGroupWeight(address _collectionCenter) internal view returns (uint) {
        uint totalGroupWeight;
        CollectionCenter storage center = collectionCenters[_collectionCenter];

        for (uint i = 0; i < center.societyAddresses.length; i++) {
            address society = center.societyAddresses[i];
            totalGroupWeight += center.societyWeights[society];
        }

        return totalGroupWeight;
    }

    function contains(address[] memory _array, address _element) internal pure returns (bool) {
        for (uint i = 0; i < _array.length; i++) {
            if (_array[i] == _element) {
                return true;
            }
        }
        return false;
    }

    function addCollectionCenter(address _municipalCorporation, address _collectionCenter) external onlyOwner {
        require(!municipalCorporations[_municipalCorporation].isCollectionCenter[_collectionCenter], "Collection center already exists for this municipal corporation");
        municipalCorporations[_municipalCorporation].isCollectionCenter[_collectionCenter] = true;
        municipalCorporations[_municipalCorporation].collectionCenterAddresses.push(_collectionCenter);
    }

    function submitMunicipalCorporationWeight(address _municipalCorporation, uint _weight) external onlyOwner {
        uint totalGroupWeight = calculateTotalAllCollectionCentersWeight(_municipalCorporation);

        //require(_weight == totalGroupWeight, "Total weight does not match the sum of society weights");

        collectionCenters[_municipalCorporation].totalWeight = _weight;

        emit CollectionCenterWeightUpdated(_municipalCorporation, _weight);
    }

    function calculateTotalAllCollectionCentersWeight(address _municipalCorporation) public view returns (uint) {
        uint totalWeight;

        // Loop through each collection center address in the municipal corporation
        for (uint i = 0; i < municipalCorporations[_municipalCorporation].collectionCenterAddresses.length; i++) {
            address collectionCenterAddress = municipalCorporations[_municipalCorporation].collectionCenterAddresses[i];

            // Add the total weight of the current collection center to the total weight
            totalWeight += collectionCenters[collectionCenterAddress].totalWeight;
        }

        return totalWeight;
    }

    function checkMunicipalCorporationWeightConsistency(address _municipalCorporation) external view returns (bool) {
        return collectionCenters[_municipalCorporation].totalWeight == calculateTotalAllCollectionCentersWeight(_municipalCorporation);
    }

    // Landfill Functionality
    struct Landfill {
        uint totalWeight;
        address[] municipalCorporationAddresses;
        mapping(address => bool) isMunicipalCorporation;
    }

    mapping(address => Landfill) internal landfills;

    event LandfillWeightUpdated(address landfill, uint weight);

    function addMunicipalCorporationToLandfill(address _landfill, address _municipalCorporation) external onlyOwner {
        require(!landfills[_landfill].isMunicipalCorporation[_municipalCorporation], "Municipal corporation already exists for this landfill");
        landfills[_landfill].isMunicipalCorporation[_municipalCorporation] = true;
        landfills[_landfill].municipalCorporationAddresses.push(_municipalCorporation);
    }

    function submitLandfillWeight(address _landfill, uint _weight) external onlyOwner {
        uint totalGroupWeight = calculateTotalAllMunicipalCorporationWeights(_landfill);

        //require(_weight == totalGroupWeight, "Total weight does not match the sum of municipal corporation weights");

        landfills[_landfill].totalWeight = _weight;

        emit LandfillWeightUpdated(_landfill, _weight);
    }

    function calculateTotalAllMunicipalCorporationWeights(address _landfill) public view returns (uint) {
        uint totalWeight;

        // Loop through each municipal corporation address in the landfill
        for (uint i = 0; i < landfills[_landfill].municipalCorporationAddresses.length; i++) {
            address municipalCorporationAddress = landfills[_landfill].municipalCorporationAddresses[i];

            // Add the total weight of the current municipal corporation to the total weight
            totalWeight += collectionCenters[municipalCorporationAddress].totalWeight;
        }

        return totalWeight;
    }

    function checkLandfillWeightConsistency(address _landfill) external view returns (bool) {
        return landfills[_landfill].totalWeight == calculateTotalAllMunicipalCorporationWeights(_landfill);
    }
}