import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import '../css/styles_layout.css'
import { Link, useNavigate } from 'react-router-dom';

const Projects = (props) => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({
        name: '',
        description: '',
        lead: '',
        department: ''
    });
    const [projectsList, setProjectsList] = useState([]);
    const [leadersList, setLeadersList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getProjects();
    }, []);

    useEffect(() => {
        setProjectsList(projects.map((project, index) => {
            return (
                <button key={index} className="task-button" onClick={() => redirectToTasks(project.id)}>
                    <p className="name-task-button">{project.name}</p>
                    <p className="desc-task-button">Descrição: {project.description}</p>
                </button>
            )
        }))
    }, [projects]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        };

        let response = await fetch('http://localhost:3000/project', options);
        let data = await response.json();
        if (response.status === 200) {
            setProject({
                name: '',
                description: '',
                lead: '',
                department: ''
            });
            document.getElementById('myModal').style.display = "none";
            getProjects();
        }
        else
            console.log(data.message)
    }

    const getProjects = async () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let response = await fetch('http://localhost:3000/project', options);
        let data = await response.json();
        setProjects(data);
    }

    const getLeaders = async () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let response = await fetch('http://localhost:3000/user?role=Manager', options);
        let data = await response.json();
        data.unshift({ id: 'selectLeader', name: 'Select a leader' });
        setLeadersList(data.map((lead, index) => {
            console.log(lead._id)
            return (
                <option key={index} value={lead._id}>{lead.name}</option>
            )
        }));
    };

    const redirectToTasks = (id) => {
        navigate(`/projects/${id}/tasks`);
    }


    const openModal = async () => {
        document.getElementById("modal").style.display = "block";
        await getLeaders();

    }

    const insertProject = async () => {
        console.log(project)
        if(project.lead === 'selectLeader') {
            alert('Select a leader');
            return;
        }

        if(project.department === 'selectDepartment') {
            alert('Select a department');
            return;
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        };

        let response = await fetch('http://localhost:3000/project', options);
        let data = await response.json();
        if (response.status === 200) {
            setProject({
                name: '',
                description: '',
                lead: '',
                department: ''
            });
            document.getElementById('modal').style.display = "none";
            getProjects();
        }
        else
            alert('It whats not possible to create the project')
    }

    return (
        <div>
            <Sidebar />
            <main className="main">

                <div className="div-main">

                    <h1>Lista de Projetos</h1>

                    <button className="add-task-button" id="add-task-button" onClick={openModal}>Adicionar Projeto</button>

                    <ul id="task-list">
                        {projectsList}
                    </ul>

                </div>

                <div id="modal" className="modal">
                    <div className="modal-content">
                        <span className="close" id="close-modal" onClick={() => document.getElementById("modal").style.display = 'none'}>&times;</span>
                        <h2>Cadastro de Projeto</h2>
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
                            <button className="modal-button" type="button" onClick={insertProject}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Projects;