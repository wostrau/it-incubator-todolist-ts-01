import React, {useEffect, useState} from 'react';
import {todolistsAPI} from './todolists-api';

export default {
    title: 'API'
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const title = 'New todolist sent from storybook';
        todolistsAPI.createTodolist(title)
            .then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const id = 'd9ac3bef-fb2c-49b8-b201-e0c805ac01da';
        todolistsAPI.deleteTodolist(id)
            .then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const id = 'f36c3dbb-f2b1-4edc-814f-09b014b7a1b8';
        const title = 'What to learn';
        todolistsAPI.updateTodolistTitle(id, title)
            .then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => setState(res.data));
    };
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                />
                <button onClick={getTasks}>GET TASKS</button>
            </div>
        </div>
    );
};
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');
    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => setState(res.data))
    };
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                />
                <input
                    placeholder={'taskTitle'}
                    value={taskTitle}
                    onChange={(e) => {
                        setTaskTitle(e.currentTarget.value)
                    }}
                />
                <button onClick={createTask}>CREATE TASK</button>
            </div>
        </div>
    )
};
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
    };
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                />
                <input
                    placeholder={'taskId'}
                    value={taskId}
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value)
                    }}
                />
                <button onClick={deleteTask}>DELETE TASK</button>
            </div>
        </div>
    )
};
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');
    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline,
        }).then((res) => setState(res.data));
    };
    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                type={'text'}
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input
                type={'text'}
                placeholder={'taskId'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}
            />
            <input
                type={'text'}
                placeholder={'title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <input
                type={'text'}
                placeholder={'description'}
                value={description}
                onChange={(e) => {
                    setDescription(e.currentTarget.value)
                }}
            />
            <input
                type={'number'}
                placeholder={'status'}
                value={status}
                onChange={(e) => {
                    setStatus(Number(e.currentTarget.value))
                }}
            />
            <input
                type={'number'}
                placeholder={'priority'}
                value={priority}
                onChange={(e) => {
                    setPriority(Number(e.currentTarget.value))
                }}
            />
            <input
                type={'text'}
                placeholder={'startDate'}
                value={startDate}
                onChange={(e) => {
                    setStartDate(e.currentTarget.value)
                }}
            />
            <input
                type={'text'}
                placeholder={'deadline'}
                value={deadline}
                onChange={(e) => {
                    setDeadline(e.currentTarget.value)
                }}
            />
            <button onClick={updateTask}>UPDATE TASK</button>
        </div>
    </div>
};
