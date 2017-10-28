import React, { Component } from 'react';
import './App.css';
import ChatArea from './components/ChatArea';
import LoginWindow from './components/Login';
import './config';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSetNickname = this.handleSetNickname.bind(this);
    this.handleSetChannel = this.handleSetChannel.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);

    this.state = {
      userLogged: false,
      userChannel: null,
      userNickname: null
      // userNickname: 'Testerg',
      // userChannel: 2,
      // userLogged: true
    };

  }

  handleSetNickname(value) {
    this.setState({ userNickname: value });
  }

  handleSetChannel(value) {
    this.setState({ userChannel: value });
  }

  handleUserLogin() {
    this.setState({ userLogged: true });
  }

  render() {
    var view;

    if (this.state.userLogged) {
      view = <ChatArea nickName={this.state.userNickname} channel={this.state.userChannel} />;
    } else {
      view = <LoginWindow onConfirmChannel={this.handleSetChannel} 
            onProceed={this.handleUserLogin}
            onConfirmNickname={this.handleSetNickname} />;
    }

    return (
      <div className="App">
        {view}
      </div>
    );
  }
}

export default App;
