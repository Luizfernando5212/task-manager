import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/styles_perfil.css'

const Cadastro = (props) => {
    const { user, setUser } = props
    const [isUpdate, setIsUpdate] = useState(false);
    const [password, setPassword] = useState('');
    const [ userUpdate, setUserUpdate ] = useState({
        email: user.email,
        name: user.name
    })

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserUpdate({ ...userUpdate, [name]: value });
    };

    const handleClick = async () => {
        if (!isUpdate) {
            setIsUpdate(!isUpdate)
        } else {
            let options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userUpdate)
            };
            await fetch(`https://task-manager-sgx9.onrender.com/user/${user._id}`, options)

            setIsUpdate(!isUpdate)

            async function getUser() {
                const token = localStorage.getItem('authToken');
                const userId = JSON.parse(localStorage.getItem('user'));

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

        }
    }

    return (
        <main className="main">
            <div className="div-main">
                <div className="user-card">
                    <h3>Informações do Usuário</h3>
                    <table>
                        <tr>
                            <td><strong>Usuário:</strong></td>
                            <td>{props.user.username}</td>
                            <td><button className={!isUpdate ? "new-password-button" : 'confirm-password-button'} onClick={handleClick}>{!isUpdate ? 'Atualizar cadastro' : 'Confirmar'}</button></td>
                        </tr>
                        <tr>
                            <td><strong>Senha:</strong></td>
                            {!isUpdate ? <td>********</td> : <input
                                placeholder={'Digite a senha'}
                                className="form-control my-3 p-2"
                                name='password'
                                onChange={handleInputChange}
                                value={userUpdate.password}
                                required />}
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            {!isUpdate ? <td>{props.user.email}</td> : <input
                                placeholder={'Digite o email'}
                                className="form-control my-3 p-2"
                                name='email'
                                onChange={handleInputChange}
                                value={userUpdate.email} 
                                required />}
                        </tr>
                        <tr>
                            <td><strong>Nome:</strong></td>
                            {!isUpdate ? <td>{props.user.name}</td> : <input
                                placeholder={'Digite o nome'}
                                className="form-control my-3 p-2"
                                onChange={handleInputChange}
                                name='name'
                                value={userUpdate.name} 
                                required />}
                        </tr>
                        <tr>
                            <td><strong>Função:</strong></td>
                            <td>{props.user.role}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default Cadastro;