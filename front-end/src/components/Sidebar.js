import React, { useState, useEffect } from "react";
import '../css/styles_sidebar.css'
import logo from '../utils/img/logo-athena.svg'
import { Link } from 'react-router-dom';


const Sidebar = (props) => {
    const { user } = props;
    const [screenRole, setScreenRole] = useState('');

    useEffect(() => {
        if (user) {
            setScreenRole(user.screenRole)
        }
    }, [])


    return (
        <aside className="sidebar">
            <header className="sidebar-header ">
                <img className="logo-img" src={logo} alt="logo" />
            </header>

            <nav>
                <Link to='/profile'>

                    <button>
                        <span>
                            <i className="material-symbols-outlined"> person </i>
                            <span>Perfil</span>
                        </span>
                    </button>
                </Link>

                <Link to='/projects'>

                    <button>
                        <span>
                            <i className="material-symbols-outlined"> work_outline </i>
                            <span>Projetos</span>
                        </span>
                    </button>
                </Link>

                <Link to='/chat'>

                    <button>
                        <span>
                            <i className="material-symbols-outlined"> question_answer </i>
                            <span>Chat</span>
                        </span>
                    </button>
                </Link>


                {/* {screenRole === 'admin' &&*/} <Link to='/register'>

                    <button>
                        <span>
                            <i className="material-symbols-outlined"> account_circle </i>
                            <span>Cadastro</span>
                        </span>
                    </button>
                </Link>{/* } */}

                <Link to='/dashboard'>

                    <button>
                        <span>
                            <i className="material-symbols-outlined"> home </i>
                            <span>Home</span>
                        </span>
                    </button>
                </Link>

                <Link to='/logout'>
                    <button>
                        <span>
                            <i className="material-symbols-outlined"> logout </i>
                            <span>Logout</span>
                        </span>
                    </button>
                </Link>

            </nav>
        </aside >
    )
}

export default Sidebar;