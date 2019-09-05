const config = require("../../config"),
    Web3 = require('web3')

var web3 = window.web3

if (typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider)
    console.log("Metamask provider")
} else {
    alert("Please, install Metamask plugin.")
    var web3 = new Web3( new Web3.providers.HttpProvider(config.ethereum.endpoint))
    console.log("Local provider")
}

exports.web3 = web3
web3.eth.defaultAccount = config.ethereum.account
    
var logger = require('../../logger').logger.nta
//TODO: probar
//var ABI = require('./ABI.js').default
const NMAbi = JSON.parse(config.ethereum.networMonitor.ABI)
const ERC20Abi = JSON.parse(config.ethereum.ERC20.ABI)
const NMContract = new web3.eth.Contract(NMAbi, config.ethereum.networMonitor.Address)
const ERC20Contract = new web3.eth.Contract(ERC20Abi, config.ethereum.ERC20.Address)


//*************************************METAMASK FUNCTIONS*************************************/

// handles the metamask events
export var handleAccountsChanged = async function () {
    var promise = new Promise((resolve, reject) => {
        window.ethereum.on('accountsChanged', function (accounts) {
            console.log("EVENTO METAMASK ------- Cambio de cuenta" + accounts[0])
            resolve(accounts[0])
        })
    })
    return promise
}

//gets an specific account
export var getDefaultAccount = async function (userIP) {
    const accounts = await window.ethereum.enable()     // Cuadro de login MetaMask
    console.log(accounts)
    const account = accounts[userIP]
    web3.eth.defaultAccount = account
    console.log("Default account: " + account)
    const balance = await web3.eth.getBalance(account)
    console.log("Balance:", web3.utils.fromWei(balance, "ether"), "eth")
    return await account
}

//*************************************NTA FUNCTIONS*************************************/

// gets the total network consumption
exports.getTotalConsumption = function (req, res) {
    logger.info('[GET-TOTAL-CONSUMPTION] Getting total network consumption...')
    NMContract.methods.getTotalConsumption().call().then(result => {
        logger.info(`[GET-TOTAL-CONSUMPTION] Smart Contract called successfully`)
        res.status(200).send({totalConsumption: web3.utils.hexToNumber(result)})
    }).catch(err => {
        logger.error('[GET-TOTAL-CONSUMPTION] ' + err.message)
        res.status(500).send({ error: '[GET-TOTAL-CONSUMPTION] ' +  err.message })
    })
}

// gets percentage of network ocupation
exports.getNetworkOcupation = function (req, res) {
    logger.info('[NETWORK-OCUPATION] Getting total network consumption...')
    NMContract.methods.getTotalConsumption().call().then(result => {
        logger.info(`[NETWORK-OCUPATION] Smart Contract called successfully`)
        var totalConsumption = web3.utils.hexToNumber(result)
        console.log("CONSUMO TOTAL: ", totalConsumption)
        console.log("ANCHO DE BANDA: ", config.networkBandwidth)
        var networkOcupation = Math.round((totalConsumption/config.networkBandwidth) * 100) / 100
        console.log("OCUPACION DE LA RED: ", networkOcupation)
        res.status(200).send({networkOcupation: networkOcupation})
    }).catch(err => {
        logger.error('[NETWORK-OCUPATION] ' + err.message)
        res.status(500).send({ error: '[NETWORK-OCUPATION] ' +  err.message })
    })
}

// gets network consumption by user
exports.getUserConsumption = function (req, res) {
    logger.info('[GET-USER-CONSUMPTION] Getting total network consumption...')
    NMContract.methods.getUserConsumption(req.params.userIP).call().then(result => {
        logger.info(`[GET-USER-CONSUMPTION] Smart Contract called successfully`)
        res.status(200).send({userConsumption: web3.utils.hexToNumber(result)})
    }).catch(err => {
        logger.error('[GET-USER-CONSUMPTION] ' + err.message)
        res.status(500).send({ error: '[GET-USER-CONSUMPTION] ' +  err.message })
    })
}

//  get the network access price
exports.accessPrice = function (req, res) {
    logger.info('[ACCESS-PRICE] Getting total network consumption...')
    NMContract.methods.getTotalConsumption().call().then(result => {
        logger.info(`[ACCESS-PRICE] Smart Contract called successfully`)
        var totalConsumption = web3.utils.hexToNumber(result)
        console.log("CONSUMO TOTAL: ", totalConsumption)
        console.log("ANCHO DE BANDA: ", config.networkBandwidth)
        console.log("OCUPACION DE LA RED: ", Math.round((totalConsumption/config.networkBandwidth) * 100) / 100)
        var accessPrice = Math.round(1/(1-(totalConsumption/config.networkBandwidth)) * 100) / 100
        console.log("PRECIO DE ACCESO: ", accessPrice)
        res.status(200).send({accessPrice: accessPrice})
    }).catch(err => {
        logger.error('[ACCESS-PRICE] ' + err.message)
        res.status(500).send({ error: '[ACCESS-PRICE] ' +  err.message })
    })
}

// calculates the cost for an user and transfers the tokens
exports.costPerUser = function (req, res) {
    logger.info('[COST-PER-USER] Getting consumption for user ' + req.params.userIP)
    userIP = req.params.userIP
    NMContract.methods.getUserConsumption(userIP).call().then(result => {
        logger.info(`[COST-PER-USER] Smart Contract called successfully`)
        var userConsumption = web3.utils.hexToNumber(result)
        console.log("CONSUMO DEL USUARIO: ", userConsumption)
        console.log("ANCHO DE BANDA: ", config.networkBandwidth)
        var userOcupation = Math.round((userConsumption/config.networkBandwidth) * 100) / 100
        console.log("OCUPACION DE LA RED DE ESE USUARIO: ", userOcupation)
        var costPerUser = 0
        //TODO: el costPerUser tiene que ser x10 para que coja un decimal
        if(userOcupation < 0.1){
            costPerUser = 1
        }else if (userOcupation >= 0.5){
            costPerUser = Math.round(((userOcupation * 10 * 1.5)) * 100) / 100
        }else if (userOcupation >= 0.75){
            costPerUser = Math.round(((userOcupation * 10 * 2)) * 100) / 100
        }else if (userOcupation >= 0.90){
            costPerUser = Math.round(((userOcupation * 10 * 4)) * 100) / 100
        }else{
            costPerUser = Math.round((userOcupation * 10) * 100) / 100
        }
        amount = costPerUser * 10
        console.log("User cost: " + costPerUser)
        logger.info('[COST-PER-USER] Unlocking account to transfer network tokens...')
        web3.eth.personal.unlockAccount(config.devices_address[userIP], config.ethereum.pass, 0x000000000000000000000000000014).then(result => {
            logger.info('[COST-PER-USER] Unlocked account?: ' + result)
            logger.info(`[COST-PER-USER] Transfering ${costPerUser} tokens to network manager...`)
            ERC20Contract.methods.transfer(config.ethereum.account, amount).send({from: config.devices_address[userIP], gasPrice: '3000000', gas: '4000000'})
            .on('transactionHash', (tx) => {
                logger.info(`[COST-PER-USER] Successfully transfer from ${config.devices_address[userIP]} to network manager`)
                res.status(200).send({costPerUser: costPerUser, transferTransaction: tx})
            })
            .on('error', (err) => {
            })
        }).catch(err => {
            logger.error('[COST-PER-USER] Error unlocking the account' + err)
            res.status(500).send({error: '[COST-PER-USER] Error unlocking the account' + err.message})  
        })
    }).catch(err => {
        logger.error('[COST-PER-USER] ' + err.message)
        res.status(500).send({ error: '[COST-PER-USER] ' +  err.message })
    })
}

// gets the token balance for an user
exports.userBalance = function (req, res) {
    logger.info('[USER-BALANCE] Getting user balance...')
    userIP = req.params.userIP
    ERC20Contract.methods.balanceOf(config.devices_address[userIP]).call().then(balance => {
        balance = balance / 10
        logger.info('[USER-BALANCE] User balance: ' + balance)
        res.status(200).send({userBalance: balance})
    }).catch(err => {
        logger.error('[USER-BALANCE] ' + err)
        res.status(500).send({error: '[USER-BALANCE] ' + err.message})  
    })
}

// transfers tokens between users
exports.transferTokens = function (req, res) {
    logger.info('[TRANSFER-TOKENS] Getting user balance...')
    fromIP = req.params.from
    toIP = req.params.to
    amount = req.params.amount * 10
    ERC20Contract.methods.balanceOf(config.devices_address[fromIP]).call().then(balance => {
        if (balance < amount){
            logger.error('[TRANSFER-TOKENS] The user does not have enough founds: ' + balance + 'tokens')
            res.status(500).send({error: 'The user does not have enough founds: ' + balance + 'tokens'})
        }else{
            web3.eth.personal.unlockAccount(config.devices_address[fromIP], config.ethereum.pass, 0x000000000000000000000000000014).then(result => {
                logger.info('[TRANSFER-TOKENS] Unlocked account?: ' + result)
                ERC20Contract.methods.transfer(toIP, amount).send({from: config.devices_address[fromIP], gasPrice: '3000000', gas: '4000000'})
                .on('transactionHash', (tx) => {
                    logger.info(`[TRANSFER-TOKENS] Smart Contract called successfully`)
                    res.status(200).send({transferTransaction: tx})
                })
                .on('error', (err) => {
                })
            }).catch(err => {
                logger.error('[TRANSFER-TOKENS] Error unlocking the account' + err)
                res.status(500).send({error: '[TRANSFER-TOKENS] Error unlocking the account' + err.message})  
            })
        }
    }).catch(err => {
        logger.error('[TRANSFER-TOKENS] ' + err)
        res.status(500).send({error: '[TRANSFER-TOKENS] ' + err.message})  
    })
}