import React from 'react';

/*
*   ChannelListItem
*   Properties:
*       name
*       selected
*       open
*       selectCallback
*/
export default class ChannelListItem extends React.Component {

    constructor(props) {
        super(props);

         /*
        * Sets selection on clicked item
        */
        this.handleClick = () => {
            if(this.props.selectCallback && typeof(this.props.selectCallback) === 'function') {
                this.props.selectCallback(this);
            }
        }
    }

    render() {
        if(this.props.selected) {
            return(
                <div class="channel-label selected" onClick={this.handleClick}><span>{this.props.name}</span></div>
            );
        } else {
            return(
                <div class="channel-label" onClick={this.handleClick}><span>{this.props.name}</span></div>
            );
        }
        
    }
}