import React from 'react';
import ChannelListItem from './ChannelListItem';
import CreateChannel from '../popups/CreateChannel';
import PostService from  '../../services/PostService';

export default class ChannelList extends React.Component {
    // PROPS
    // channels
    constructor(props) {
        super(props);

        this.state = {
            channels: [],
            activePopup: null
        };

        this.handleSelectChannel = this.handleSelectChannel.bind(this);

        this.createChannelSuccess = () => {
            console.log("channel created");
        }

        this.handleCreateChannelConfirm = (data) => {
            this.setState({ activePopup: null });
            PostService.send('createchannel', data, this.createChannelSuccess);
        }

        this.handleCreateChannelClick = () => {
            this.setState({ activePopup: <CreateChannel confirmCallback={this.handleCreateChannelConfirm}/> });
        }
    }

    handleSelectChannel(selectedChannel) {

        const channels = this.state.channels;
        channels.forEach((channel) => {
            if(channel.id === selectedChannel.props.id) {
                channel.selected = true;
            } else {
                channel.selected = false;
            }
        });
        this.setState({ channels: channels });
    }

    componentDidMount() {
        const channels = this.props.channels.map((channel) => {
            return {
                id: channel.id,
                key: channel.id,
                name: channel.name,
                selected: channel.selected,
                open: channel.open
            }
        });
        this.setState({ channels: channels});
    }

    render() {
        return (
            <div class="chat-channel-list">
                <ul>{
                    this.state.channels.map((channel) => <ChannelListItem
                        key={channel.key}
                        id={channel.id}
                        selected={channel.selected}
                        open={channel.open}
                        selectCallback={this.handleSelectChannel}
                        name={channel.name} />)
                }</ul>
                <button
                    onClick={this.handleCreateChannelClick}
                    class="btn-channels-create">Create</button>
                {this.state.activePopup}
            </div>
        );
    }
}