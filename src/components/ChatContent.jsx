import React from 'react';
import ChatLine from './ChatLine';
import config from '../config';

class ChatContent extends React.Component {
  // props: channel
  constructor(props) {
    super(props);

    this.state = {
      linesTotalHeight: 0,
      rawLines: [],     // array of raw chatlines
      renderedLines: [] // array of rendered chatlines
    };

    this.lineKey = 0;
    this.heightLimit = 416;
    this.channels = ['None', 'General', 'Development'];

    // callback for adding line
    this.addLineHeight = (height) => {
      var last = this.state.rawLines[this.state.rawLines.length - 1];
      last.height = height;

      var totalH = 0;
      this.state.rawLines.forEach(function(line) {
        totalH = totalH + line.height;
      });

      while (totalH > this.heightLimit) {
        const x = this.state.rawLines;
        const d = x.shift();
        totalH = totalH - d.height;
        this.renderLines(x);
      }
    };

    this.handleWSMessage = this.handleWSMessage.bind(this);
    this.addLineHeight = this.addLineHeight.bind(this);
  }

  connectWebsocket() {
    var connection = new WebSocket(config.getWebsocketAddress());

    connection.addEventListener('open', function (event) {
      connection.send('websocket');
    });

    connection.addEventListener('message', this.handleWSMessage);
    this.setState({ inputDisabled: false });
  }

  componentDidMount() {
    this.connectWebsocket();
    this.addLine(config.getUserName(), 'now talking in ' + this.channels[this.props.channel]);
  }

  addLine(user, line) {
    const datetime = new Date();
    const x = this.state.rawLines;
    x.push({ datetime: datetime, nickname: user, line: line });
    this.renderLines(x);
    this.setState({ rawLines: x });
  }

  renderLines(lines) {
    var i = 0;
    const renderedLines = lines.map((line) => <ChatLine
        key={i++}
        nickname={line.nickname} 
        datetime={line.datetime}
        line={line.line}
        addLineCallback={this.addLineHeight}
        />);

    this.setState({ renderedLines: renderedLines });

    return (
        <ul class="chat-lines">{renderedLines}</ul>
    );
  }



  handleWSMessage(event) {
    console.log('Message from server ', event.data);
    var newline = JSON.parse(event.data);
    if(newline[0].content === 'newline') {
      this.addLine(newline[1].user, newline[1].line);
    }
  }

  render() {
    return (
        <div class="chat-content">
            {this.state.renderedLines}
        </div>
    );
  }
}

export default ChatContent;