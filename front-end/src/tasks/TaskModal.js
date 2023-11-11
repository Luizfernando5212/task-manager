import React, { useState, useEffect } from 'react';

const TaskModal = (props) => {
    const { reload, project, user } = props;
    const [task, setTask] = useState({
        project: project,
        creator: user._id,
        name: '',
        description: '',
        timeEstimate: '',
        assignee: 'selectAssignee',
    })
    const [assigneeList, setAssigneeList] = useState([])

    // console.log(task);

    useEffect(() => {
        getAssignees();
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    };

    const getAssignees = async () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let response = await fetch('https://task-manager-sgx9.onrender.com/user?role=Manager&not=true', options);
        let data = await response.json();

        data.unshift({ id: 'selectAssignee', name: 'Select an Assignee' });
        setAssigneeList(data.map((assignee, index) => {
            // console.log(assignee)
            return (
                <option key={index} value={assignee._id} >{assignee.name}</option>
            )
        }));
    }

    const insertTask = async () => {
        console.log(task);

        if (task.assignee === 'selectAssignee') {
            alert('Select an assignee');
            return;
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }

        let response = await fetch('https://task-manager-sgx9.onrender.com/task', options);
        let data = await response.json();

        if (response.status === 200) {
            setTask({
                project: project,
                name: '',
                description: '',
                timeEstimate: '',
                assignee: 'selectAssignee',
            })
            document.getElementById('modal2').style.display = 'none';
            reload();
        } else {
            alert('It was not possible to create the task');
        }

    }

    return (
        <div id="modal2" className="modal2">
            <div className="modal-content">
                <span className="close" id="close-modal2" onClick={() => document.getElementById('modal2').style.display = 'none'}>&times;</span>
                <h2>Cadastro de Tarefa</h2>
                <br />
                <form id="project-form-2">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        value={task.name}
                        onChange={handleInputChange}
                        required />
                    <br />

                    <label htmlFor="description">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        name='description'
                        value={task.description}
                        onChange={handleInputChange}
                        required />
                    <br />

                    <label htmlFor="timeEstimate">Tempo Estimado (horas):</label>
                    <input
                        type="text"
                        id="timeEstimate"
                        name='timeEstimate'
                        value={task.timeEstimate}
                        onChange={handleInputChange}
                        required />
                    <br />

                    <label htmlFor="assignee">Atribuído para:</label>
                    <select onChange={(e) => {
                        console.log(e.target); 
                        setTask({ ...task, assignee: e.target.value })
                    }} id="assignee" required>
                        {assigneeList}
                    </select>
                    <br />

                    <button className="modal-button" type="button" onClick={insertTask}>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default TaskModal;