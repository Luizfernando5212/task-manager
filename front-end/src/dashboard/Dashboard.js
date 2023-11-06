import React, { useState, useEffect, useRef } from "react";
// import '../utils/bootstrap.css'
import '../css/styles_layout.css'
import '../css/chat.css'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Chat from "../chat/Chat";
import Projects from "../projects/Projects";

const Dashboard = (props) => {
    const { user, location, setUser } = props;
    const [screen, setScreen] = useState('dashboard'); // ['dashboard', 'chat', 'projects', 'logout']
    const navigate = useNavigate();

    // console.log(location)

    useEffect(() => {
        // console.log(user)
        if (Object.keys(user).length === 0) {
            console.log('Usuário não logado')
            navigate('/login');
        }
        document.title = 'Dashboard';
    }, []);

    useEffect(() => {
        console.log(location)
        if (location === '/chat') {
            setScreen('chat');
        } else if (location === '/projects') {
            setScreen('projects');
        } else if (location === '/logout') {
            setScreen('logout');
            console.log('logout')
        } else {
            setScreen('dashboard');
        }
    }, [location])

    const returnScreen = () => {
        if (screen === 'dashboard') {
            return (
                <div id="div2">{user.name}, Bem vindo ao Athena Project Manager</ div >
            )
        } else if (screen === 'chat') {
            return (
                <Chat user={user} />
            )
        } else if (screen === 'projects') {
            return (
                <Projects user={user} />
            )
        } else if (screen === 'logout') {
            setUser({});
            navigate('/login');
        }
    }

    return (
        <div>
            <Sidebar setScreen={setScreen} />
            {returnScreen()}
        </div>
    )
}

export default Dashboard;