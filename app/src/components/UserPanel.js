import React from 'react';

import '../styles/App.css';


export default class UserPanel extends React.Component {
constructor(props) {
    super(props)
}

render(){
  return (
    <div className="UserPanel-div">
      

       <h3 className="UserPanel-div-h3">{this.props.prop1}</h3>

</div>
  );
}
}


