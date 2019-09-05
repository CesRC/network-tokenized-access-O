#! /usr/bin/env python

import json

with open('../NMContract.json', 'r') as abi_definition:
    abi = json.load(abi_definition)
    print(abi)