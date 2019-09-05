import React from 'react';
import axios from 'axios';
import config from '../config';
import logo from '../images/p.png';
import '../styles/App.css';


export default class App extends React.Component {
constructor(props) {
    super(props)
    //this.state = { assetid: "assetid", user: "xxx"}

}


render(){
  return (
    <div className="App">
      
      <header className="App-header">
        <h1>
          Welcome to Network Tokenized Access
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      
        {this.state.assetid}

        {/* <ComponenteHijo assetid={this.state.assetid}/> */}
      </header>
    </div>
  );
}
}


