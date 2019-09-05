import sys
import time
import pprint

from web3 import Web3
import json

address = "0x1aEa839d1a719f8c9DBc66C4ad19eF42993718f9"

def main():
    web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
    print("Is Connected to the node?: ", web3.isConnected())
   
    with open('factory.json', 'r') as abi_definition:
        abi = json.load(abi_definition)
    contract = web3.eth.contract(address=address, abi=abi)

    gas_estimate = contract.functions.setUserConsumption("2.2.2.2", 250).estimateGas()
    print("Gas estimate to transact with setUserConsumption: {0}\n".format(gas_estimate))

    if gas_estimate < 100000:
        print("Sending transaction to setUserConsumption\n")
        tx_hash = contract.functions.setUserConsumption("2.2.2.2", 250).transact()
        receipt = web3.eth.waitForTransactionReceipt(tx_hash)
        print("Transaction receipt mined: \n")
        pprint.pprint(dict(receipt))
        print("Was transaction successful? \n")
        pprint.pprint(receipt['status'])
    else:
        print("Gas cost exceeds 100000")

if __name__== "__main__":
    main()