import React from 'react';
import ChatContent from "./ChatContent";
import ChannelList from "./channels/ChannelList";
import * as Elements from './Elements';
import PostService from '../services/PostService';


export default class ChatArea extends React.Component {
  // Props:
  // nickName
  // channel

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      inputDisabled: false,
      channels: [
        { id: 0, name: 'General', selected: false, open: false },
        { id: 1, name: 'Development', selected: false, open: false }
      ]
    };
    this.handleSendLineSuccess = this.handleSendLineSuccess.bind(this);
  }

  handleSendLineSuccess(response) {
    if (response.status === 'OK') {
      this.setState({ inputText: '', inputDisabled: false });
    }
  }

  handleSend() {
    this.setState({ inputDisabled: true });
    PostService.send('', { 'user': this.props.nickName, 'line': this.state.inputText }, this.handleSendLineSuccess);
  }

  onInputChange(inputValue) {
    this.setState({inputText: inputValue});
  }

  updateNickname(inputValue) {
    this.setState({nickname: inputValue});
  }

  render() {
    return (
      <section class="chat-container">
        <div class="chat-area">
          <ChatContent channel={this.props.channel}/>
          <br />
          <Elements.InputField 
            isDisabled={this.state.inputDisabled}
            onEnter={() => this.handleSend()}
            onChange={(inputValue) => this.onInputChange(inputValue)}
            value={this.state.inputText}
          />
          <Elements.SendButton isDisabled={this.state.inputDisabled} onClick={() => this.handleSend()} />
        </div>
        <div class="chat-right-side">
          <ChannelList channels={this.state.channels}/>
        </div>
      </section>
    );
  }
}