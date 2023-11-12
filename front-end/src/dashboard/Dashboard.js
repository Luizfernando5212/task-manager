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


    useEffect(() => {

        const token = localStorage.getItem('authToken');
        const userId = JSON.parse(localStorage.getItem('user'));
        async function getUser() {

            if (token) {
                let options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                };
                const response = await fetch(`https://task-manager-sgx9.onrender.com/user/${userId}`, options)
                const data = await response.json();
                setUser(data);
            } else {
                navigate('/login');
            }
        }
        getUser();
    }, []);

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
            return (<Chat user={user} />)
        } else if (screen === 'projects') {
            return (<Projects user={user} />)
        } else if (screen === 'logout') {
            localStorage.removeItem('authToken');
            setUser({});
            navigate('/login');
        } else if (screen === 'register') {
            return (<Register user={user} />)
        } else if (screen === 'profile') {
            return (<Profile user={user} setUser={setUser} />);
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