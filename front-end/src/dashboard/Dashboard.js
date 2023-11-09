import React, { useState, useEffect, useRef } from "react";
// import '../utils/bootstrap.css'
// import '../css/chat.css'
import '../css/styles_main.css'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Chat from "../chat/Chat";
import Projects from "../projects/Projects";
import Register from '../register/Register';
import Profile from '../profile/Profile';
import Tasks from '../tasks/Tasks'

const Dashboard = (props) => {
    const { user, location, setUser } = props;
    const [screen, setScreen] = useState('dashboard'); // ['dashboard', 'chat', 'projects', 'logout']
    const navigate = useNavigate();

    // console.log(location)

    useEffect(() => {
        // console.log(user)
        console.log(user)
        if (Object.keys(user).length === 0) {
            console.log('Usuário não logado')
            navigate('/login');
        }
    }, [user]);

    useEffect(() => {
        console.log(location)
        if (location === '/chat') {
            setScreen('chat');
            document.title = 'Chat';
        } else if (location === '/projects') {
            setScreen('projects');
            document.title = 'Projetos';
        } else if (location === '/logout') {
            setScreen('logout');
        } else if (location === '/updatePassword') {
            setScreen('updatePassword');
        } else if (location === '/profile') {
            setScreen('profile');
            document.title = 'Perfil';
        } else if (location === '/tasks') {
            setScreen('tasks');
            document.title = 'Tarefas';
        } else if (location === '/register') {
            setScreen('register');
            document.title = 'Cadastro';
        }
        else {
            setScreen('dashboard');
            document.title = 'Dashboard';
        }
    }, [location])

    const returnScreen = () => {
        if (screen === 'dashboard') {
            return (
                <main className='main'>
                    <div className='div-main'>
                        <h1>{user.name}, Bem vindo ao Athena Project Manager</ h1 >
                    </div>
                </main>
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
        } else if (screen === 'register') {
            console.log('oi');
            return (<Register user={user} />)
        } else if (screen === 'profile') {
            return (<Profile user={user} />);
        } else if (screen === 'tasks') {
            return (<Tasks user={user} />)
        }
    }

    return (
        <div>
            <Sidebar user={user} setScreen={setScreen} />
            {returnScreen()}
        </div>
    )
}

export default Dashboard;