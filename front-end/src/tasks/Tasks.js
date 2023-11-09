import React, { useState, useEffect } from 'react';
import '../css/styles_tarefas.css'
import { useParams } from 'react-router-dom';

const Tasks = (props) => {
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const [taskStatus, setTaskStatus] = useState({});
    const [filterStatus, setFilterStatus] = useState('todos');
    const [filterAssignee, setFilterAssignee] = useState('todos');


    useEffect(() => {
        getProject();
    }, []);

    useEffect(() => {
        if (Object.keys(project).length > 0) {

            if (project.tasks.length > 0) {

                setTasks(project.tasks.map((task, index) => {
                    return (
                        <li className="card" key={index}>
                            <h3>{task.name}</h3>
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
                                        <td>{task.assignee.name}</td>
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

        let response = await fetch(`http://localhost:3000/task/${event.target.name}`, options);
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
        let project = await fetch(`http://localhost:3000/project/${id}`, options);
        let data = await project.json();
        let tasks = {}
        for (let task of data.tasks) {
            let taskId = task.id;
            let taskStatus = task.status;
            tasks[taskId] = taskStatus;
        }

        setTaskStatus(tasks)
        setProject(data);
    }

    return (
        <main className="main">

            <div className="div-main">

                <h1>Nome do Projeto</h1>

                <div className="search-bar">
                    <div className="search-input-container">
                        <input type="text" id="search-input" placeholder="Pesquisar nome da Tarefa" />
                        <select id="status-filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="filter" disabled >Filtrar por Status</option>
                            <option value="todos">Todos</option>
                            <option value="não iniciada">Não iniciada</option>
                            <option value="em andamento">Em andamento</option>
                            <option value="concluido">Concluído</option>
                        </select>
                        <select id="assignee-filter" value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)}>
                            <option value="" disabled >Filtrar por Atribuição</option>
                            <option value="todos">Todos</option>
                            <option value="em andamento">Em andamento</option>
                            <option value="concluido">Concluído</option>
                        </select>
                    </div>
                    <div className="button-container">

                        <button className="exclude-button" id="add-task-button">Excluir Projeto</button>
                        <button className="add-task-button" id="open-edit-modal-button">Editar Projeto</button>
                        <button className="add-task-button" id="open-modal-button">Adicionar Tarefa</button>
                    </div>
                </div>

                <ul id="task-list">
                    {tasks.filter((task, index) => {
                        const keys = Object.keys(taskStatus);
                        if(filterStatus === 'todos') return true;
                        return taskStatus[keys[index]] === filterStatus;
                    })
                    .filter((task) => { 
                        if(filterAssignee === 'todos') return true;
                        return task.assignee.name === filterAssignee;
                    })}
                </ul>

            </div>
        </main>

    )
}

export default Tasks;