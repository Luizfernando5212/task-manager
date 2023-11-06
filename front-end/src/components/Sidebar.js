import React from "react";
import '../css/styles_layout.css'
import projetos from '../utils/img/Projetos.png'
import chat from '../utils/img/Envelope.png'
import cadastro from '../utils/img/Cadastro.png'
import sair from '../utils/img/sair.png'
import logo from '../utils/img/logo-athena.svg'
import athena from '../utils/img/athena-descrição.svg'
import { Link } from 'react-router-dom';


const Sidebar = (props) => {
    return (
        <aside className="sidebar">
            <header className="sidebar-header ">
                <img className="logo-img" src={logo} alt="logo" />
            </header>

            <nav>
                <Link to='/projects'>

                    <button>
                        <span>
                            <i className="material-symbols-outlined"> tag </i>
                            <span>Projetos</span>
                        </span>
                    </button>
                </Link>

                <Link to='/chat'>

                    <button>
                        <span>
                            <i className="material-symbols-outlined"> email </i>
                            <span>Chat</span>
                        </span>
                    </button>
                </Link>

                <Link to='/register'>

                    <button>
                        <span>
                            <i className="material-symbols-outlined"> person </i>
                            <span>Cadastro</span>
                        </span>
                    </button>
                </Link>

                <Link to='/logout'>
                    <button>
                        <span>
                            <i className="material-symbols-outlined"> tag </i>
                            <span>Logout</span>
                        </span>
                    </button>
                </Link>

            </nav>
        </aside>
    )
}

export default Sidebar;