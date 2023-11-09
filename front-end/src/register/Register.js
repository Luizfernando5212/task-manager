import React, { useState, useEffect } from "react";


const Register = (props) => {
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        name: '',
        role: ''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const insertUser = async () => {
        if (newUser.role === 'Select a role') {
            alert('Select a role');
            return;
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        };

        let response = await fetch('http://localhost:3000/user', options);
        let data = await response.json();
        if (response.status === 200) {
            setNewUser({
                username: '',
                email: '',
                name: '',
                role: ''
            });
            // document.getElementById('modal').style.display = "none";
            // getProjects();
        }

    }

    return (
        <main className="main">
            <div className="div-main">

                <h1>Cadastro de Usuário:</h1>
                <h1></h1>

                <form id="project-form">
                    <label htmlFor="username" className="form-label">Usuário:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        name='username'
                        value={newUser.username}
                        onChange={handleInputChange}
                        required />
                    <br />

                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        name='email'
                        value={newUser.email}
                        onChange={handleInputChange}
                        required />
                    <br />

                    <label htmlFor="name" className="form-label">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-input"
                        name='name'
                        value={newUser.name}
                        onChange={handleInputChange}
                        required />
                    <br />

                    <label htmlFor="role" className="form-label">Função:</label>
                    <select onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} id="role" className="form-input" required>
                        <option value="Select a role">Select a role</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Assistant">Assistant</option>
                        <option value="QA tester">QA tester</option>
                    </select>
                    <br />

                    <button className="modal-button" type="button" onClick={insertUser}>Cadastrar</button>
                </form>
            </div>
        </main>
    )
}

export default Register;