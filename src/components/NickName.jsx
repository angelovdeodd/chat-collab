import React from 'react';
import config from '../config';
import PostService from '../services/PostService';

export default class NickName extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeButton = this.handleChangeButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSendUserSuccess = this.handleSendUserSuccess.bind(this);

    this.state = {
      value: '',
      confirmed: false,
    }
  }

  handleSendUserSuccess(response) {
      if (response.status === 'OK') {
        this.setState({ confirmed: true });
        config.setWebsocketAddress(response['websocket-address']);
        config.setUserName(this.state.value);

        if (typeof(this.props.onConfirm) === 'function') {
          this.props.onConfirm(this.state.value);
        }
      }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    if (typeof(this.props.onChange) === 'function') {
      this.props.onChange(event.target.value);
    }
  }

  handleClick(event) {
    if (this.state.value !== '') {
      PostService.send('register', { user: this.state.value }, this.handleSendUserSuccess);
    }
  }

  handleChangeButton() {
    this.setState({ confirmed: false });
  }

  // bound to input node, fired on component mount
  focusTextInput(component) {
    if (component) {
      component.focus();
      component.select();
    }
  }

  render() {
    if (this.state.confirmed) {
      return (
        <fieldset>
          Nickname: <b>{this.state.value}</b>&nbsp;<button onClick={this.handleChangeButton}>Change</button>
        </fieldset>
        );
    } else {
      return (
        <fieldset>
          <input ref={this.focusTextInput} size="15" type="text" value={this.state.value} placeholder="Please enter nickname" onChange={this.handleChange} />
          <button onClick={this.handleClick}>Set</button><br />
        </fieldset>
      );
    }
  }
}
