import React, { useState, useEffect } from "react";
import '../css/styles_projeto.css'
import { Link, useNavigate } from 'react-router-dom';
import ProjectModal from './ProjectModal'

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
                <li className="card" key={index}>
                    <h3>{project.name}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Descrição:</strong></td>
                                <td>{project.description}</td>
                            </tr>
                            <tr>
                                <td><strong>Lead:</strong></td>
                                <td>{project.lead.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Departamento:</strong></td>
                                <td>{project.department}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={`/projects/${project._id}/tasks`} ><button className="task-button">Acessar Tarefas</button></Link>
                </li>
            )
        }))
    }, [projects]);

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
            return (
                <option key={index} value={lead._id}>{lead.name}</option>
            )
        }));
    };

    const openModal = async () => {
        document.getElementById("modal").style.display = "block";
        await getLeaders();

    }

    return (
        <div>
            <main className="main">
                <div className="div-main">
                    <h1>Lista de Projetos</h1>
                    <div className="search-bar">
                        <input type="text" id="search-input" placeholder="Pesquisar por projeto" />
                        <button className="add-project" id="add-task-button" onClick={openModal}>Adicionar Projeto</button>
                    </div>
                    <ul id="task-list">
                        {projectsList}
                    </ul>
                </div>
                <ProjectModal funcao='Cadastro' getProjects={getProjects} leadersList={leadersList} />
            </main>
        </div>
    )
}

export default Projects;