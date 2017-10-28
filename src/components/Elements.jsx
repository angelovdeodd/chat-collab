import React from 'react';

export class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }


  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  handleKey(event) {
    if(event.keyCode === 13 && event.target.value !== '' && !this.props.isDisabled) {
      this.props.onEnter();
    }
  }

  render() {
    return <input class="chat-input" value={this.props.value} type="text" onKeyUp={this.handleKey} onChange={this.handleChange} />;
  }
}

export class SendButton extends React.Component {
   render() {
    return <button class="chat-send-button" disabled={this.props.isDisabled} onClick={() => this.props.onClick()}>Send</button>
  }
}

