import React from 'react';
import Channel from './Channel';

const ChannelList = (props) => {
    const { channels, onSelectChannel } = props;

    const handleClick = (id) => {
        onSelectChannel(id);
    };

    return (
        <div className='channel-list'>
            {channels ? channels.map(c => <Channel key={c._id} id={c._id} name={c.name} onClick={handleClick} />)
            : <div className="no-content-message">There is no channels to show</div>}
        </div>
    );
}

export default ChannelList;

// export class ChannelList extends React.Component {

//     handleClick = id => {
//         this.props.onSelectChannel(id);
//     }

//     render() {

//         let list = <div className="no-content-message">There is no channels to show</div>;
//         if (this.props.channels && this.props.channels.map) {
//             list = this.props.channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={this.handleClick} />);
//         }
//         return (
//             <div className='channel-list'>
//                 {list}
//             </div>);
//     }

// }