import React from 'react';

const Message1 = (props) => {
    
    return (
        <div className='message-item'>
            <div><b>{props.senderName}</b></div>
            <span>{props.text}</span>
        </div>
    )
};

export default Message1;

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