import React, { useState } from 'react';
import Message from './Message';

const MessagesPanel = (props) => {
    const [ message, setMessage ] = useState('');

    const send = () => {
        if (message && message !== '') {
            props.onSendMessage(props.channel._id, message);
            setMessage('');
        }
    };

    const handleInput = e => {
        setMessage(e.target.value);
    };

    let list = <div className="no-content-message">There is no messages to show</div>;

    if (props.channel && props.channel.messages) {
        list = props.channel.messages.map(m => <Message key={m._id} id={m.sender._id} senderName={m.sender.name} text={m.message} />);
    }

    // console.log(list)

    return (

        <div className='messages-panel'>
            <div className="meesages-list">{list}</div>
            {props.channel &&
                <div className="messages-input">
                    <input type="text" onChange={handleInput} value={message} />
                    <button onClick={send}>Send</button>
                </div>
            }
        </div>
    );

}

export default MessagesPanel;

// export class MessagesPanel extends React.Component {
//     state = { input_value: '' }
//     send = () => {
//         if (this.state.input_value && this.state.input_value != '') {
//             this.props.onSendMessage(this.props.channel.id, this.state.input_value);
//             this.setState({ input_value: '' });
//         }
//     }

//     handleInput = e => {
//         this.setState({ input_value: e.target.value });
//     }

//     render() {

//         let list = <div className="no-content-message">There is no messages to show</div>;
//         if (this.props.channel && this.props.channel.messages) {
//             list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />);
//         }
//         return (
//             <div className='messages-panel'>
//                 <div className="meesages-list">{list}</div>
//                 {this.props.channel &&
//                     <div className="messages-input">
//                         <input type="text" onChange={this.handleInput} value={this.state.input_value} />
//                         <button onClick={this.send}>Send</button>
//                     </div>
//                 }
//             </div>);
//     }

// }