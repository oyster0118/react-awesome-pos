import React, { Component } from 'react';



class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <img src={require('../../logo.svg')} alt='hey' style={{width:'50%'}}/>
      </div>
    );
  }
}
export default Welcome