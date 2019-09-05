from web3 import Web3, HTTPProvider
import os

address = "0xa7ad0FEcc4ca609f862De0E52a4E2FD5c07F901F" #Coger la direccion de la pagina del contrato en Rinkeby
#account = "0x6D63c734cfF8b067E8D34752A59EEA1eB93a8e97"
#privateKey = "privatekey"

def main():
    web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
    print("Is Connected to the node?:", web3.isConnected())

    with open('ERC20Contract.json', 'r') as abi_definition:
        abi = json.load(abi_definition)
        print(abi)
    contract = web3.eth.contract(address=address, abi=abi)

    print("Get transaction: ")
    balance = contract.functions.balanceOf("0x10eCbce9DDC5aC0B7DC39b1Ff7cF4aCE580353dd").call()
    print(balance)
    if balance <= 0:
        os.system('sudo python3 kickthemout.py --target IP')
        


if __name__== "__main__":
        main()

