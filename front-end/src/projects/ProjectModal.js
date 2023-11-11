import React, { useState, useEffect } from 'react';

const ProjectModal = (props) => {
    const { reload, id, funcao } = props;
    const [project, setProject] = useState({
        name: '',
        description: '',
        lead: 'selectLeader',
        department: 'selectDepartment'
    });
    const [leadersList, setLeadersList] = useState([]);

    useEffect(() => {
        getLeaders();
    }, [])


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProject({ ...project, [name]: value });
    };

    const insertProject = async () => {
        console.log(project)
        if (project.lead === 'selectLeader') {
            alert('Select a leader');
            return;
        }

        if (project.department === 'selectDepartment') {
            alert('selectDepartment');
            return;
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        };

        let response = await fetch('https://task-manager-sgx9.onrender.com/project', options);
        let data = await response.json();
        if (response.status === 200) {
            setProject({
                name: '',
                description: '',
                lead: 'selectLeader',
                department: 'selectDepartment'
            });
            document.getElementById('modal').style.display = "none";
            reload();
        }
        else
            alert('It was not possible to create the project')
    }

    const updateProject = async () => {
        console.log(project)
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        };

        let response = await fetch(`https://task-manager-sgx9.onrender.com/project/${id}`, options)

        if (response.status === 200) {
            setProject({
                name: '',
                description: '',
                lead: 'selectLeader',
                department: 'selectDepartment'
            });
            document.getElementById('modal').style.display = "none";
            reload();
        } else {
            alert('It was not possible to Update the project')
        }
    }

    const getLeaders = async () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let response = await fetch('https://task-manager-sgx9.onrender.com/user?role=Manager', options);
        let data = await response.json();
        data.unshift({ id: 'selectLeader', name: 'Select a leader' });
        setLeadersList(data.map((lead, index) => {
            return (
                <option key={index} value={lead._id}>{lead.name}</option>
            )
        }));
    };

    return (
        <div id="modal" className="modal">
            <div className="modal-content">
                <span className="close" id="close-modal" onClick={() => document.getElementById("modal").style.display = 'none'}>&times;</span>
                <h2>{props.funcao} de Projeto</h2>
                <form id="project-form">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        value={project.name}
                        onChange={handleInputChange}
                        required />
                    <br />

                    <label htmlFor="description">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        name='description'
                        value={project.description}
                        onChange={handleInputChange}
                        required />
                    <br />

                    <label htmlFor="lead">Lead:</label>
                    <select onChange={(e) => setProject({ ...project, lead: e.target.value })} id="lead" required>
                        {leadersList}
                    </select>
                    <br />

                    <label htmlFor="department">Departamento:</label>
                    <select onChange={(e) => setProject({ ...project, department: e.target.value })} id="department" required>
                        <option value="selectDepartment">Select a department</option>
                        <option value="development">Development</option>
                        <option value="quality assurance">Quality assurance</option>
                        <option value="other">Other</option>
                    </select>
                    <br />
                    <button className="modal-button" type="button" onClick={funcao === 'Cadastro' ? insertProject : updateProject}>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default ProjectModal;