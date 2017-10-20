import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';


class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: 'http://localhost:4001',
    };
  }
  componentDidMount() {
    let { endpoint } = this.state;
    let socket = socketIOClient(endpoint);
    socket.on('FromAPI', data => this.setState({ response: data }));
  }
  render() {
    // let { response } = this.state;
    console.log(this.state.response);
    return (
      <div>
        {this.state.response
          ? <p>
              The temperature in Seattle is: {this.state.response} °F
          </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default App;