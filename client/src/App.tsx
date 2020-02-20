import React, { Component } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import 'react-tree-graph/dist/style.css'
import Devices from './components/Devices';

type MyProps = any;
type MyState = any;

class App extends Component<MyProps, MyState> {

  endpoint = "http://localhost:5000";
  communication = 'sockets';

  constructor(props: any) {
    super(props);

    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      devices: [],
    };

  }

  componentDidMount() {

    if (this.communication === 'sockets') {
      const socket = socketIOClient(this.endpoint);
      socket.on("responsefrombackend", (response: any) => {
        this.setState({ response: response.express, devices: response.list })
      });
    } else if (this.communication = 'http') {
      this.callApi()
        .then(res => this.setState({ response: res.express, devices: res.list }))
        .catch(err => console.log(err));
    }
  }


  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };



  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        {this.state.devices.length > 0 ? <Devices devices={this.state.devices} /> : null}
      </div>
    );
  }
}

export default App;