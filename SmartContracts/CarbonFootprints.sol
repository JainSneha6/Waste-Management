// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonFootprints {
  // Structure to represent each household
  struct Household {
    uint256 wetWaste; // Amount of wet waste emitted
    uint256 dryWaste; // Amount of dry waste emitted
    address owner; // Address of the household owner
  }

  address public owner;
  mapping(address => Household) private households; // Change to private

  // Event emitted when a new household is registered
  event HouseholdRegistered(address indexed owner, uint256 wetWaste, uint256 dryWaste);

  // Variables to keep track of the household with the least carbon footprint
  address private lowestCarbonFootprintHousehold; // Change to private
  uint256 private lowestCarbonFootprint = type(uint256).max; // Change to private

  // Modifier to check if caller is the owner of the contract
  modifier onlyOwner() {
    require(msg.sender == owner, "Only contract owner can call this function");
    _;
  }

  constructor() {
    owner = msg.sender;
  }

  // Function to register a new household
  function registerHousehold(uint256 _wetWaste, uint256 _dryWaste) external {
    households[msg.sender] = Household(_wetWaste, _dryWaste, msg.sender);
    emit HouseholdRegistered(msg.sender, _wetWaste, _dryWaste);

    // Update lowest carbon footprint if applicable
    if ((_wetWaste + _dryWaste) < lowestCarbonFootprint) {
      lowestCarbonFootprint = _wetWaste + _dryWaste;
      lowestCarbonFootprintHousehold = msg.sender;
    }
  }

  // Getter function to retrieve wet waste of a household
  function getWetWaste(address _household) external view returns (uint256) {
    return households[_household].wetWaste;
  }

  // Getter function to retrieve dry waste of a household
  function getDryWaste(address _household) external view returns (uint256) {
    return households[_household].dryWaste;
  }

  // Function to get the carbon footprint of a household
  function getCarbonFootprint(address _household) external view  returns (uint256) {
    Household storage household = households[_household];
    return household.wetWaste + household.dryWaste;
  }

  // Function to retrieve the lowest carbon footprint household
  function getLowestCarbonFootprintHousehold() external view returns (address) {
    return lowestCarbonFootprintHousehold;
  }

  // Function to retrieve the lowest carbon footprint
  function getLowestCarbonFootprint() external view  returns (uint256) {
    return lowestCarbonFootprint;
  }
}