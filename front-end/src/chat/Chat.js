import React, { useState, useEffect } from 'react';
import ChannelList from './ChannelList';
import './chat.scss';
import MessagesPanel from './MessagesPanel';
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";
const socket = socketClient(SERVER);

const Chat = (props) => {
    const [ channels, setChannels ] = useState([]);
    const [ channel, setChannel ] = useState({});
    const [ id, setId ] = useState('');
    // const [ roomId, setRoomId ] = useState('');
    const [, setState] = useState(false);

    const loadChannels = async () => {
        // let list = [];
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let channels = await fetch(`http://localhost:3000/user/channels/${id}`, options);
        let data = await channels.json();
        // console.log(data)
        if(Array.isArray(data))
            setChannels(data);
        else
            setChannels([]);
    }

    useEffect(() => {
        socket.on('message', function(message) {
            handleMessageReceived(message, channel);
        });

        return () => {
            socket.off('message');
        };
    }, [channel])

    useEffect(() => {
        const handleConnection = () => {
            console.log('connected with the back end');
        };
        socket.on('connection', handleConnection);
        return () => {
            socket.off('connection', handleConnection);
            socket.disconnect()
        };
    }, [])

    useEffect(() => {
        if(id)
            loadChannels();
    }, [id]);

    const handleMessageReceived = async (data, currentChannel) => {
        // console.log(data)
        // console.log(currentChannel)
        // console.log(data.sender)
        if (data.sender === currentChannel._id || data.receiver === currentChannel._id) {
            setChannel(prevChannel => ({
                ...prevChannel,
                messages: [...prevChannel.messages, data.message]
            }));
        } else {
            console.log(`Mensagem do ${data.sender}`)
        }
        // console.log(channel)
        setState(prevState => !prevState);

    }    

    const handleChannelSelect = async channelId => {
        console.log(channel);
        if (channel._id) {
            socket.emit('leaveRoom', channel._id);
        }
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let localChannel = channels.find(c => {
            return c._id === channelId;
        });
        // let room = await fetch
        console.log(id)
        let messages = await fetch(`http://localhost:3000/message/${id}/${localChannel._id}`, options);
        let data = await messages.json();
        localChannel.messages = data;
        setChannel(localChannel);
        socket.emit('joinRoom', localChannel._id);

        // socket.emit('channel-join', id, ack => {
        // });
    }

    const handleSendMessage = async (channel_id, text) => {

        let message = {
            sender: id,
            receiver: channel_id,   
            message: text,
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        };
        /* const response = */ await fetch('http://localhost:3000/message', options);
        // socket.emit('send-message', { channel_id, text, sender: socket.id, id: Date.now() });
    }

    const handleInput = e => {
        setId(e.target.value);
        console.log(e.target.value)
        socket.emit('joinRoom', e.target.value);
    };

    return (
        <div className='chat-app'>
            <input type="text" onChange={handleInput} value={id} />
            <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
            <MessagesPanel onSendMessage={handleSendMessage} channel={channel} />
        </div>
    );
}

export default Chat;

// export class Chat extends React.Component {

//     state = {
//         channels: null,
//         socket: null,
//         channel: null
//     }
//     socket;
//     componentDidMount() {
//         this.loadChannels();
//         this.configureSocket();
//     }

//     configureSocket = () => {
//         var socket = socketClient(SERVER);
//         socket.on('connection', () => {
//             if (this.state.channel) {
//                 this.handleChannelSelect(this.state.channel.id);
//             }
//         });
//         socket.on('channel', channel => {
            
//             let channels = this.state.channels;
//             channels.forEach(c => {
//                 if (c.id === channel.id) {
//                     c.participants = channel.participants;
//                 }
//             });
//             this.setState({ channels });
//         });
//         socket.on('message', message => {
            
//             let channels = this.state.channels
//             channels.forEach(c => {
//                 if (c.id === message.channel_id) {
//                     if (!c.messages) {
//                         c.messages = [message];
//                     } else {
//                         c.messages.push(message);
//                     }
//                 }
//             });
//             this.setState({ channels });
//         });
//         this.socket = socket;
//     }

//     loadChannels = async () => {
//         fetch('http://localhost:8080/getChannels').then(async response => {
//             let data = await response.json();
//             this.setState({ channels: data.channels });
//         })
//     }

//     handleChannelSelect = id => {
//         let channel = this.state.channels.find(c => {
//             return c.id === id;
//         });
//         this.setState({ channel });
//         this.socket.emit('channel-join', id, ack => {
//         });
//     }

//     handleSendMessage = (channel_id, text) => {
//         this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now() });
//     }

//     handleInput = e => {
//         this.setState({ input_value: e.target.value });
//     }

//     render() {

//         return (
//             <div className='chat-app'>
//                 {/* <input type="text" onChange={this.handleInput} value={this.state.input_value} />     */}
//                 <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
//                 <MessagesPanel onSendMessage={this.handleSendMessage} channel={this.state.channel} />
//             </div>
//         );
//     }
// }