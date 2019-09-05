from web3 import Web3, HTTPProvider
import json
import math
import time

address = "0xb02e3c1294618A50eb3e04772CACB19E55eb3c2D" #Coger la direccion de la pagina del contrato en Rinkeby
account = "0x6D63c734cfF8b067E8D34752A59EEA1eB93a8e97"
privateKey = "privatekey"
networkBandwidth = 800000 #0.8MB
global networkOcupation

def sendInfoToEthereum(consumeByIpN):
    print("********************************ETHEREUM**************************************")
    print(consumeByIpN)
    print("**********************************************************************")
    web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
    print("Is Connected to the node?:", web3.isConnected())
    balance = web3.eth.getBalance(account)
    print("Account balance:", web3.fromWei(balance, "ether"))
    
    with open('NMContract.json', 'r') as abi_definition:
        abi = json.load(abi_definition)
        #print(abi)
    contract = web3.eth.contract(address=address, abi=abi)

    try:
        senderAccount = web3.eth.account.privateKeyToAccount(privateKey)
    except:
        print("ERROR: Not a valid private key")
        sys.exit(1)
    
    print("Interacting with contract in address: ", address)
    for ip, consumption in consumeByIpN.items():
        if consumption != 0:
            if ip == 'Total-Consume':
                #Percentaje of network ocupation
                networkOcupation = (consumption / networkBandwidth) * 100
                #Send network total consumption
                print("Sending transaction for",ip, ", consumption:", consumption, "bytes", "(setTotalConsumption)")
                print("Estimating gas cost...")
                estimateGas = contract.functions.setTotalConsumption(consumption).estimateGas()
                #print(estimateGas)
                tx = contract.functions.setTotalConsumption(consumption).buildTransaction({'gas': estimateGas, 'nonce': web3.eth.getTransactionCount(senderAccount.address)})
                print("Transaction:")
                print(tx)
                print("Signing transaction...")
                signed = web3.eth.account.signTransaction(tx, senderAccount.privateKey)
                txHash = web3.eth.sendRawTransaction(signed.rawTransaction)
                while (not txHash):
                    print("Sending transaction...")
                print("Succesfully sent transaction ", {web3.toHex(txHash)})
                #print(contract.functions.getTotalConsumption().call())
                time.sleep(15)
                print("****************************************************************************")
            else:
                #Send users consumption
                print("Sending transaction for",ip, ", consumption:", consumption, "bytes", "(setUserConsumption)")
                print("Estimating gas cost...")
                estimateGas = contract.functions.setUserConsumption(ip, consumption).estimateGas()
                #print(estimateGas)
                tx = contract.functions.setUserConsumption(ip, consumption).buildTransaction({'gas': estimateGas, 'nonce': web3.eth.getTransactionCount(senderAccount.address)})
                print("Transaction:")
                print(tx)
                print("Signing transaction...")
                signed = web3.eth.account.signTransaction(tx, senderAccount.privateKey)
                txHash = web3.eth.sendRawTransaction(signed.rawTransaction)
                while (not txHash):
                    print("Sending transaction...")
                print("Succesfully sent transaction ", {web3.toHex(txHash)})
                #print(contract.functions.getUserConsumption(ip).call())
                time.sleep(15)
                print("****************************************************************************")
    print("The network ocupation is: %.5f" % networkOcupation, "%")

def ethereum(consumeByIpN):
    sendInfoToEthereum(consumeByIpN)

if __name__== "__main__":
        ethereum()