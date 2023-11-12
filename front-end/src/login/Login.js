import React, { useState, useEffect } from 'react';
import '../css/styles_login.css'
import img from '../utils/img/athena_nomelogo.svg';
import Fields from './components/Fields';
import { returnFields } from '../utils/loginFields.js';
import loginUrls from '../utils/loginUrls.js';
import { useNavigate, Link, useParams } from 'react-router-dom';


const Login = (props) => {
    const navigate = useNavigate();

    const { id } = useParams();

    const { setUser, location } = props;
    // const [user, setUser] = useState({});
    const [login, setLogin] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [screen, setScreen] = useState('login');

    useEffect(() => {
        if (location === '/forgotPassword') {
            setScreen('forgotPassword');
        } else if(location === '/updatePassword') {
            setScreen('updatePassword');
        }
        else {
            setScreen('login');
        }
    }, [location])

    useEffect(() => {
        document.title = screen;
    }, [screen]);

    const handleSubmit = async (e) => {
        if(screen === 'updatePassword' && login.password !== login.confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }
        e.preventDefault();
        let options = {
            method: screen === 'updatePassword' ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        };
        let response;
        if (screen === 'updatePassword') {
            response = await fetch(loginUrls[screen].url + id, options);
        } else {
            response = await fetch(loginUrls[screen].url, options);
        }

        // let response = await fetch(loginUrls[screen].url, options);
        let data = await response.json();
        loginUrls[screen].tratamento(data, response, setError, navigate, setUser, setLogin);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value });
    };

    return (
        <section className="Form my-5 mx-5 " >
            {error && <div style={{ textAlign: 'center', width: '200px' }} className="alert alert-danger">{error}</div>}

            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mt-3">
                        <img src={img} className="image-fluid" alt="" />
                    </div>
                    <div className="col-lg-5 px-5 pt-3">
                        <h6>Digite suas credenciais:</h6>
                        <form onSubmit={handleSubmit}>
                            <Fields fields={returnFields(screen)} login={login} handleInputChange={handleInputChange} />
                            <div className="form-row">
                                <div className="col-lg-7 mb-2">
                                    <button type='submit' className="bt-login">{screen === 'login' ? 'LOGIN' : screen === 'forgotPassword' ? 'Enviar e-mail' : 'Alterar a senha'}</button>
                                </div>
                            </div>
                            {screen === 'login' && <Link to='/forgotPassword'>
                                <p className='mt-2' style={{ fontSize: '12px' }}>
                                    Esqueceu sua senha?
                                </p>
                            </Link>}


                        </form>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Login;