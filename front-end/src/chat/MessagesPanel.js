import React, { useState } from 'react';
import Message from './Message';

const MessagesPanel = (props) => {
    const [message, setMessage] = useState('');

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
        list = props.channel.messages.map(m => {
            return (
                <Message
                    key={m.id}
                    id={m.sender}
                    senderName={m.sender}
                    text={m.message}
                    time={m.createdAt} 
                    messageType={m.sender === props.channel.name ? 'received' : 'sent'}/>)
        })
    }


    return (

        <div className='chat'>
            <div className='chat-header'>
                <h2>{`Chat com ${props.channel.name}`}</h2>
            </div>
            <div className="meesage-list">{list}</div>
            {props.channel &&
                <div className="message-input">
                    <input
                        id='message-text'
                        type="text"
                        placeholder='Digite sua mensagem...'
                        onChange={handleInput}
                        value={message} />
                    <button
                        class="button-chat"
                        id="send-button"
                        onClick={send}>Send</button>
                </div>
            }
        </div>
    );

}

export default MessagesPanel;