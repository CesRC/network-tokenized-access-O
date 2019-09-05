import React from 'react';
import axios from 'axios';
import config from '../config';
import logo from '../images/p.png';
import '../styles/App.css';


export default class InfoPanel extends React.Component {
constructor(props) {
    super(props)
    //this.state = { assetid: "assetid", user: "xxx"}
}

componentWillMount(){

}

componentDidMount() {

}
render(){
  return (
    <div className="App">
      
      <header className="App-header">
       <h1>{this.props.prop1}</h1>

      </header>
    </div>
  );
}
}


