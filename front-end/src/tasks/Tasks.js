import React, { useState, useEffect } from 'react';
import '../css/styles_tarefas.css'
import { useParams, useNavigate } from 'react-router-dom';
import ProjectModal from '../projects/ProjectModal';
import TaskModal from '../tasks/TaskModal'

const Tasks = (props) => {
    const { user } = props;
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const [taskStatus, setTaskStatus] = useState({});
    const [filterStatus, setFilterStatus] = useState('todos');
    const [filterAssignee, setFilterAssignee] = useState('todos');
    const [filterName, setFilterName] = useState('');
    const [assigneeList, setAssigneeList] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        getProject();
        getAssignees();
    }, []);

    useEffect(() => {
        if (Object.keys(project).length > 0) {

            if (project.tasks.length > 0) {

                setTasks(project.tasks.map((task, index) => {
                    return (
                        <li className="card" key={index}>
                            <h3>{task.name}</h3>
                            <span className="close" id="delete-task" onClick={() => deleteTask(task.id)}>&times;</span>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong>Descrição:</strong></td>
                                        <td>{task.description}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Status:</strong></td>
                                        <td>
                                            <select value={taskStatus[task.id]} name={task.id} onChange={handleSelectChange}>
                                                <option value="não iniciada">Não Iniciado</option>
                                                <option value="em andamento">Em Andamento</option>
                                                <option value="concluido">Concluído</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Tempo Estimado:</strong></td>
                                        <td>{task.timeEstimate}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Criador:</strong></td>
                                        <td>{task.creator.name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Atribuído para:</strong></td>
                                        <td id={task.assignee._id}>{task.assignee.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    )
                }))
            }
        }
    }, [project]);

    const handleSelectChange = async (event) => {
        setTaskStatus({
            ...taskStatus,
            [event.target.name]: event.target.value,
        });

        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: event.target.value })
        };

        let response = await fetch(`https://task-manager-sgx9.onrender.com/task/${event.target.name}`, options);
        let data = await response.json();

        if (response.status === 200) {
            getProject();
        }


    };

    const getProject = async () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let project = await fetch(`https://task-manager-sgx9.onrender.com/project/${id}`, options);
        let data = await project.json();
        let tasks = {}
        if (Object.keys(tasks).length > 0) {

            for (let task of data.tasks) {
                let taskId = task.id;
                let taskStatus = task.status;
                tasks[taskId] = taskStatus;
            }
        }

        setTaskStatus(tasks)
        setProject(data);
    }

    const deleteProject = async () => {
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let response = await fetch(`https://task-manager-sgx9.onrender.com/project/${id}`, options);
        if (response.status === 200) {
            navigate('/projects');
            getProject();
        } else {
            alert('It was not possible to Delete the project')
        }

    }

    const deleteTask = async (id) => {
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let response = await fetch(`https://task-manager-sgx9.onrender.com/task/${id}`, options);
        if (response.status === 200) {
            getProject();
        } else {
            alert('It was not possible to Delete the task')
        }
    }


    const getAssignees = async () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let response = await fetch('https://task-manager-sgx9.onrender.com/user?role=Manager&not=true', options);
        let data = await response.json();

        // data.unshift({ id: 'selectAssignee', name: 'Select an Assignee' });
        setAssigneeList(data.map((assignee, index) => {
            return (
                <option key={index} value={assignee._id} >{assignee.name}</option>
            )
        }));
    }

    return (
        <main className="main">

            <div className="div-main">

                <h1>{project.name}</h1>

                <div className="search-bar">
                    <div className="search-input-container">
                        <input type="text" id="search-input" placeholder="Pesquisar nome da Tarefa" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
                        <select id="status-filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="filter" disabled >Filtrar por Status</option>
                            <option value="todos">Todos</option>
                            <option value="não iniciada">Não iniciada</option>
                            <option value="em andamento">Em andamento</option>
                            <option value="concluido">Concluído</option>
                        </select>
                        <select id="assignee-filter" value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)}>
                            <option value="filter" disabled >Filtrar por Atribuição</option>
                            <option value="todos">Todos</option>
                            {assigneeList}
                        </select>
                    </div>
                    <div className="button-container">

                        <button className="exclude-button" id="add-task-button" onClick={deleteProject}>Excluir Projeto</button>
                        <button className="add-task-button" id="open-edit-modal-button" onClick={() => document.getElementById("modal").style.display = "block"}>Editar Projeto</button>
                        <button className="add-task-button" id="open-modal-button" onClick={() => document.getElementById("modal2").style.display = "block"}>Adicionar Tarefa</button>
                    </div>
                </div>

                <ul id="task-list">
                    {tasks.filter((task, index) => {
                        const keys = Object.keys(taskStatus);
                        if (filterStatus === 'todos') return true;
                        return taskStatus[keys[index]] === filterStatus;
                    })
                        .filter((task) => {
                            if (filterAssignee === 'todos' || filterAssignee === '') {
                                return true;
                            } else {
                                return task.props.children[1].props.children.props.children[4].props.children[1].props.id === filterAssignee;
                            }

                            // return task.assignee.name === filterAssignee;
                        }).filter((task) => {
                            const regex = new RegExp(filterName, 'i');
                            if (filterName === '') {
                                return true;
                            } else {
                                return regex.test(task.props.children[0].props.children);
                            }
                        })}
                </ul>

            </div>
            <ProjectModal funcao='Atualização' id={project.id} reload={getProject} />
            <TaskModal user={user} project={id} reload={getProject} />
        </main>

    )
}

export default Tasks;