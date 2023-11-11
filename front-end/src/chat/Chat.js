import React, { useState, useEffect } from 'react';
import ChannelList from './ChannelList';
// import './chat.scss';
import '../css/styles_chat.css';
import MessagesPanel from './MessagesPanel';
import socketClient from "socket.io-client";
import { useNavigate } from 'react-router-dom';
const SERVER = "http://127.0.0.1:8080";
const socket = socketClient(SERVER);

const Chat = (props) => {
    const { user } = props;
    const navigate = useNavigate();
    const [channels, setChannels] = useState([]);
    const [channel, setChannel] = useState({});
    const [id, setId] = useState('');
    const [, setState] = useState(false);

    const loadChannels = async (id) => {
        // let list = [];
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let channels = await fetch(`https://task-manager-sgx9.onrender.com/user/${id}/channels`, options);
        let data = await channels.json();
        // console.log(data)
        if (Array.isArray(data))
            setChannels(data);
        else
            setChannels([]);
    }

    useEffect(() => {
        socket.on('message', function (message) {
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
        // return () => {
        //     socket.off('connection', handleConnection);
        //     socket.disconnect()
        // };
        // console.log(user)
        if (user) {
            if (Object.keys(user).length === 0) {
                console.log('Usuário não logado')
                navigate('/login');
            } else {
                loadChannels(user._id);

                if (user._id) {
                    socket.emit('joinRoom', user._id);
                }
            }
        }

    }, [])

    const handleMessageReceived = async (data, currentChannel) => {
        console.log(data.message)
        if (data.sender === currentChannel._id || data.receiver === currentChannel._id) {
            setChannel(prevChannel => ({
                ...prevChannel,
                messages: [...prevChannel.messages, data.message]
            }));
        } else {
            console.log(`Mensagem do ${data.sender}`)
        }
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
        console.log(user._id)
        let messages = await fetch(`https://task-manager-sgx9.onrender.com/message/${user._id}/${localChannel._id}`, options);
        let data = await messages.json();
        console.log(data);
        localChannel.messages = data;
        setChannel(localChannel);
        socket.emit('joinRoom', localChannel._id);
    }

    const handleSendMessage = async (channel_id, text) => {

        let message = {
            sender: user._id,
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
        /* const response = */ await fetch('https://task-manager-sgx9.onrender.com/message', options);
        // socket.emit('send-message', { channel_id, text, sender: socket.id, id: Date.now() });
    }
    return (
        <main className='main'>
            <div className='div-main'>
                <div className='chat-container'>
                    {/* <input type="text" onChange={handleInput} value={id} /> */}
                    <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
                    {Object.keys(channel).length !== 0 ? <MessagesPanel user={channel} onSendMessage={handleSendMessage} channel={channel} /> : <div className='chat-header'>
                        <h2>{`Select a channel`}</h2>
                    </div>}
                </div>
            </div>
        </main>
    );
}

export default Chat;
