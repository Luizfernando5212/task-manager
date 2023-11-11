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
    const [filter, setFilter] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getProjects();
    }, []);

    // console.log(projectsList)

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
        let response = await fetch('https://task-manager-sgx9.onrender.com/project', options);
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
                        <input
                            type="text"
                            id="search-input"
                            value={filter}
                            placeholder="Pesquisar por projeto"
                            onChange={(e) => setFilter(e.target.value)} />
                        <button className="add-project" id="add-task-button" onClick={openModal}>Adicionar Projeto</button>
                    </div>
                    <ul id="task-list">
                        {projectsList.filter((project, index) => {
                            const regex = new RegExp(filter, 'i')
                            if (filter === 'todos' || filter === '') {
                                return true;
                            } else {
                                return regex.test(project.props.children[0].props.children);
                            }
                        })}
                    </ul>
                </div>
                <ProjectModal funcao='Cadastro' reload={getProjects} />
            </main>
        </div>
    )
}

export default Projects;