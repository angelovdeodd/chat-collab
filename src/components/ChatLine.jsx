import React from 'react';
import PropTypes from 'prop-types';

class ChatLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0
        };
    }

    componentDidMount() {
        this.props.addLineCallback(this.element.clientHeight);
    }

    render() {
        return (
            <li class="chat-line" ref={ (element) => this.element = element } >
                <div class="chat-line-time">{this.props.datetime.toString().slice(16,25)}</div>
                <div class="chat-line-nick">{this.props.nickname}</div>
                <div class="chat-line-line">{this.props.line}</div>
            </li>
        );
    }

}

ChatLine.propTypes = {
    /**
    * User name (nick)
    */
    nickname: PropTypes.string,

    /**
    * Time of sending a line
    */
    datetime: PropTypes.instanceOf(Date),

    /**
    * Line content
    */
    line: PropTypes.string,

    /**
    * Color of text
    */
    color: PropTypes.number
}

export default ChatLine;