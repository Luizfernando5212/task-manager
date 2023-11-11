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
                            {project.lead ? <tr>
                                <td><strong>Lead:</strong></td>
                                <td>{project.lead.name}</td>
                            </tr> : null}
                            
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

    const openModal = async () => {
        document.getElementById("modal").style.display = "block";
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
                <ProjectModal funcao='Cadastro' reload={getProjects} />
            </main>
        </div>
    )
}

export default Projects;