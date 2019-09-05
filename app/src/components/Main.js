import React from 'react';
import axios from 'axios';
import config from '../config';
import logo from '../images/p.png';
import '../styles/App.css';

import InfoPanel from './InfoPanel';
import UserPanel from './UserPanel';



export default class App extends React.Component {
    constructor(props) {
        super(props)
        //this.state = { assetid: "assetid", user: "xxx"}
        this.state = {
            totalConsumption: "",
            networkOcupation: "",
            accessPrice: "",
            userConsumption: "",
            userCost: "",
            userBalance: ""
        }
    }

    componentWillMount() {
        //this.sayHello()
        this.getTotalConsumption()
        this.getNetworkOcupation()
        this.getAccessPrice()
        this.getUserConsumption()
        this.getUserConsumption("H60-L04-6c54d40255e2bbec\ (192.168.220.74)")
        this.getUserConsumption("Cesss\ (192.168.220.149)")
        this.getUserCost("H60-L04-6c54d40255e2bbec\ (192.168.220.74)")
        this.getUserCost("Cesss\ (192.168.220.149)")
        this.getUserBalance("H60-L04-6c54d40255e2bbec\ (192.168.220.74)")
        this.getUserBalance("Cesss\ (192.168.220.149)")
    }

    componentDidMount() {

    }

    /* sayHello(){
      console.log("HELLOOOOO")
      alert("HELLO")
      this.setState({assetid:"heeeeeeee"})
    }
    */

    async getTotalConsumption() {
        axios.get(`${config.url_local_request}/totalConsumption`)
            .then(res => {
                if (res.error == undefined) {
                    this.setState({
                        totalConsumption: `The network total consume is ${res.data.totalConsumption} MBytes`
                    })
                    console.log(this.state)
                }
            }).catch(err => console.log(err))
    }

    async getNetworkOcupation() {
        axios.get(`${config.url_local_request}/networkOcupation`)
            .then(res => {
                if (res.error == undefined) {
                    this.setState({
                        networkOcupation: `The network ocupation is ${res.data.networkOcupation} %`
                    })
                    console.log(this.state)
                }
            }).catch(err => console.log(err))
    }

    async getAccessPrice() {
        axios.get(`${config.url_local_request}/accessPrice`)
            .then(res => {
                if (res.error == undefined) {
                    this.setState({
                        accessPrice: `The access price is ${res.data.accessPrice} tokens`
                    })
                    console.log(this.state)
                }
            }).catch(err => console.log(err))
    }

    async getUserConsumption(userIP) {
        axios.get(`${config.url_local_request}/userConsumption/${userIP}`)
            .then(res => {
                if (res.error == undefined) {
                    this.setState({
                        userConsumption: `The user consume is ${res.data.userConsumption} MBytes`
                    })
                    console.log(this.state)
                }
            }).catch(err => console.log(err))
    }

    async getUserCost(userIP) {
        axios.get(`${config.url_local_request}/userCost/${userIP}`)
            .then(res => {
                if (res.error == undefined) {
                    this.setState({
                        userCost: `The user cost is ${res.data.costPerUser} tokens`
                    })
                    console.log(this.state)
                }
            }).catch(err => console.log(err))
    }

    async getUserBalance(userIP) {
        axios.get(`${config.url_local_request}/userBalance/${userIP}`)
            .then(res => {
                if (res.error == undefined) {
                    this.setState({
                        userCost: `The user balance is ${res.data.userBalance} tokens`
                    })
                    console.log(this.state)
                }
            }).catch(err => console.log(err))
    }


    render() {
        return (
            <div className="App">
                <h3>Entre componentes</h3>
                <h3>Entre componentes</h3>
                <InfoPanel prop1={"propasdfasdfasfd"} />
                <h3>Entre componentes</h3>
                <div className="App-div-horizontal">
                    <h3>Entre componentes</h3>
                    <h3>Entre componentes</h3>
                </div>
                <UserPanel prop1={"proppp1111"} />

            </div>
        );
    }
}


