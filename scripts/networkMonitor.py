#! /usr/bin/env python

from scapy.all import *
from collections import Counter
import socket
from ethereumRegistry import ethereum
import os

sample_interval = 5
interface="wlan0"
networkBandwidth = 800000 #0.8MB

traffic = Counter()
hosts = {}

consumeByIp = collections.Counter()
consumeByIpN = collections.Counter()

def formatBytes(num):
    for x in ['', 'k', 'M', 'G', 'T']:
        if num < 1024.: return "%3.1f %sB" % (num, x)
        num /= 1024.
    return  "%3.1f PB" % (num)

def trafficMonitorCallback(pkt):
    if IP in pkt:
        pkt = pkt[IP]
        traffic.update({tuple(sorted(map(atol, (pkt.src, pkt.dst)))): pkt.len})
        #print("************TRAFFIC**************")
        #print(traffic)

#def checkUsersBalance():

def networkMonitoring():
    print("Setting the network bandwidth to " + str(networkBandwidth))

    sudoPassword = 'password'
    command = 'tcset wlan0 --rate 500Mbps --overwrite'
    p = os.system('echo %s|sudo -S %s' % (sudoPassword, command))
    
    print("Sniffing the wireless access point for 5 seconds...")
    totalConsume = 0
    sniff(count =0, iface=interface, prn=trafficMonitorCallback, store=False,
        timeout=sample_interval)
    
    for (h1, h2), total in traffic.most_common():
        h1, h2 = map(ltoa, (h1, h2))
        for host in (h1, h2):
            if host not in hosts:
                try:
                    rhost = socket.gethostbyaddr(host)
                    hosts[host] = rhost[0]
                except:
                    hosts[host] = None
        
        #TODO: Coger tambien los datos que envian los disp al servidor?? Creo que sí
        if('192.168.220.' in h2):
            h2 = "%s (%s)" % (hosts[h2], h2) if hosts[h2] is not None else h2
            consumeByIp.update({h2: total})

    print("Consume by ip in all the interval in bytes")
    print(consumeByIp)
    print("Calculating the media...")
    #Format and calculate total consume
    for ip, total in consumeByIp.items():
        consume = int((int(total))/sample_interval)
        consumeByIpN[ip] = consume
        totalConsume += int(total)
    consumeByIpN['Total-Consume'] = int((totalConsume)/sample_interval)
    
    print("Consume by ip per second in bytes")
    #print(consumeByIpN)

    
    #No format (bytes) and calculate total consume
    #TODO: No se calcula bytes por segundo, sino los bytes consumidos en el intervalo. Casi mejor coger los b/s
    """ for ip, total in consumeByIp.items():
        consumeByIpN[ip] = total
        totalConsume += int(total)
    consumeByIpN['Total-Consume'] = totalConsume """
    
    print("**********************************************************************")
    print(consumeByIpN)
    print("**********************************************************************")
    ethereum(consumeByIpN)
    consumeByIp.clear()
    consumeByIpN.clear()
    traffic.clear()


def main():
    #checkUsersBalance()
    networkMonitoring()

if __name__== "__main__":
        main()