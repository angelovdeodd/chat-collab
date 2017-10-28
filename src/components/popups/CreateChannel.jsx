import React from 'react';

/*
*   CreateChannel Popup
*   Properties:
*       confirmCallback
*/
export default class CreateChannel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            channelName: '',
            isPublic: true,
            isVisible: true
        }

         /*
        * Sets selection on clicked item
        */
        this.handleConfirm = () => {
            if(this.state.channelName === '') {
                return;
            }

            if(this.props.confirmCallback && typeof(this.props.confirmCallback) === 'function') {
                this.props.confirmCallback(this.state);
            }
        }

        /*
        * Controls change of name input
        */
        this.handleChange = (event) => {
            const name = event.target.name;
            const val = event.target.type === 'radio' ? Boolean(parseInt(event.target.value, 10)) : event.target.value;
            this.setState({ [name]: val });
        }
    }

    render() {
        return(
            <div class="create-channel-popup">
                <input name="channelName" type="text" value={this.state.channelName} onChange={this.handleChange} size="20" placeholder="channel name" />
                <fieldset>
                    <input name="isPublic" id="isPublicT" type="radio" value="1" checked={this.state.isPublic} onChange={this.handleChange}/>
                    <label for="isPublicT">public</label>
                    <input name="isPublic" id="isPublicF" type="radio" value="0" onChange={this.handleChange}/>
                    <label for="isPublicF">private</label>
                </fieldset>
                <fieldset>
                    <input name="isVisible" id="isVisibleT" type="radio" value="1" checked={this.state.isVisible} onChange={this.handleChange}/>
                    <label for="isVisibleT">visible</label>
                    <input name="isVisible" id="isVisibleF" type="radio" value="0" onChange={this.handleChange}/>
                    <label for="isVisibleF">invisible</label>
                </fieldset>
                <br/>
                <button onClick={this.handleConfirm} >Create</button>
            </div>
        );
    }
}