import React from 'react';
import Channel from './Channel';

const ChannelList = (props) => {
    const { channels, onSelectChannel } = props;

    const handleClick = (id) => {
        onSelectChannel(id);
    };

    return (
        <div className='chat-sidebar'>
            <ul>
                {channels ? channels.map(c => c.name !== '' ? <Channel key={c._id} id={c._id} name={c.name} onClick={handleClick} /> : null)
                    : <div className="no-content-message">There is no channels to show</div>}
            </ul>

        </div>
    );
}

export default ChannelList;