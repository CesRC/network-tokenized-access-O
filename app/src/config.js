"use strict"

module.exports = {
    name: "NTA",
    version: "0.0.0",
    env: process.env.NODE_ENV || "development",
    http_port: 9092,
    url_local_request:"http://192.168.1.72:9092",
    networkBandwidth: 800000, //Bytes
    ethereum: {
        //Raspi IP 192.168.1.72
        endpoint: "http://127.0.0.1:8545", //Rinkeby tesnet in Geth node
        account: "0x6D63c734cfF8b067E8D34752A59EEA1eB93a8e97",
        privateKey: "privatekey", // Kovan
        pass: "password",
        networMonitor: {
            //TODO: Poner el abi del ultimo contraro
            //El abi debe estar con dobles comillas y con false y true la primera en minuscula
            ABI: '[{"constant": true, "inputs": [], "name": "name", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getTotalConsumption", "outputs": [{"name": "", "type": "uint128"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "_ipAddress", "type": "string"}], "name": "getUserConsumption", "outputs": [{"name": "", "type": "uint128"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "owner", "outputs": [{"name": "", "type": "address"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_consumption", "type": "uint128"}], "name": "setTotalConsumption", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "_ipAddress", "type": "string"}, {"name": "_consumption", "type": "uint128"}], "name": "setUserConsumption", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"name": "_name", "type": "string"}, {"name": "_networkBandwidth", "type": "uint128"}], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}]',
            Address: "0xb02e3c1294618A50eb3e04772CACB19E55eb3c2D"
        },
        ERC20: { //TODO: COMPROBAR ESTE ABI
            ABI: '[{"constant": true, "inputs": [], "name": "name", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "approve", "outputs": [{"name": "", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transferFrom", "outputs": [{"name": "", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "decimals", "outputs": [{"name": "", "type": "uint8"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_spender", "type": "address"}, {"name": "_addedValue", "type": "uint256"}], "name": "increaseAllowance", "outputs": [{"name": "", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [{"name": "_tokenOwner", "type": "address"}], "name": "balanceOf", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "owner", "outputs": [{"name": "", "type": "address"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "symbol", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_spender", "type": "address"}, {"name": "_subtractedValue", "type": "uint256"}], "name": "decreaseAllowance", "outputs": [{"name": "", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transfer", "outputs": [{"name": "", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [{"name": "_tokenOwner", "type": "address"}, {"name": "_spender", "type": "address"}], "name": "allowance", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"inputs": [{"name": "_name", "type": "string"}, {"name": "_symbol", "type": "string"}, {"name": "_decimals", "type": "uint8"}, {"name": "_initialTotalSupply", "type": "uint128"}], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "from", "type": "address"}, {"indexed": true, "name": "to", "type": "address"}, {"indexed": false, "name": "value", "type": "uint256"}], "name": "Transfer", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {"indexed": true, "name": "spender", "type": "address"}, {"indexed": false, "name": "value", "type": "uint256"}], "name": "Approval", "type": "event"}]',
            //Address: "0xB0C65D4CF09A0b501923182b28637ab0b2Bb35f0"
            //Address: "0xF7F51ac3fD2dA30D03Aa567b811D37AdFf2c8Fe3" //3 decimales
            Address: "0xa7ad0FEcc4ca609f862De0E52a4E2FD5c07F901F" //1 decimal NETTest (NT)
        }
    },
    devices_address: {
        "H60-L04-6c54d40255e2bbec (192.168.220.74)": "0x10eCbce9DDC5aC0B7DC39b1Ff7cF4aCE580353dd",
        "Cesss (192.168.220.149)": "0xec6A0918AaE26e522C5a6FC0aEA5f01836cC25a3"
    } 
}
