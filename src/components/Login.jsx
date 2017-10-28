import React from 'react';
import NickName from './NickName';

export default class LoginWindow extends React.Component {
    // Props:
    // onConfirmNickname
    // onConfirmChannel
    // onProceed

    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            channel: 0,
            canProceed: false,
        }

        this.handleNicknameSet = this.handleNicknameSet.bind(this);
        this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleNicknameSet(value) {
        this.setState({ nickname: value }, this.checkProceed);
        if (typeof(this.props.onConfirmNickname) === 'function') {
            this.props.onConfirmNickname(value);
        }
    }

    handleGoButtonClick() {
        if (this.state.canProceed && typeof(this.props.onProceed) === 'function') {
            this.props.onProceed();
        }
    }

    handleSelectChange(event) {
        this.setState({ channel: event.target.selectedOptions[0].value}, this.checkProceed);
        if (typeof(this.props.onConfirmChannel) === 'function') {
            this.props.onConfirmChannel(event.target.selectedOptions[0].value);
        }
    }

    checkProceed() {
        this.setState({ canProceed: true });

        if (this.state.nickname.length === 0 || this.state.nickname.length > 16) {
            this.setState({ canProceed: false });
        } 

        if (this.state.channel === 0) {
            this.setState({ canProceed: false });
        } 
    }

    render() {

        return (
            <div class="channel-select">
                <NickName onConfirm={this.handleNicknameSet} />
                <div class="channel-select-label">Select channel</div>
                <select onFocus={this.handleSelectChange} onChange={this.handleSelectChange} class="channel-select-select" size="10">
                    <option value="1">General</option>
                    <option value="2">Development</option>
                </select>
                <button disabled={!this.state.canProceed} onClick={this.handleGoButtonClick}>Go</button>
            </div>
        );
    }
}
