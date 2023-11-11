import React, { useState } from 'react';

const Message = (props) => {
    const [time, setTime] = useState(new Date(props.time));
    
    return (
        <div className='message '>
            <div className={`message-content ${props.messageType}`}>
                <p>{props.text}</p>
                <span className='message-time'>
                    {time.getHours().toString().padStart(2,'0') + ':' + time.getMinutes().toString().padStart(2,'0')}
                </span>
            </div>
        </div>
    )
};

export default Message;

// export default class Message extends React.Component {

//     render() {
//         return (
//             <div className='message-item'>
//                 <div><b>{this.props.senderName}</b></div>
//                 <span>{this.props.text}</span>
//             </div>
//         )
//     }
// }