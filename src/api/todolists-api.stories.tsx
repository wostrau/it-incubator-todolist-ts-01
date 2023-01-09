import React, {useEffect, useState} from 'react';
import {todolistsAPI} from './todolists-api';

export default {
    title: 'API'
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const title = 'New todolist sent from storybook';
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const id = 'd9ac3bef-fb2c-49b8-b201-e0c805ac01da';
        todolistsAPI.deleteTodolist(id)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const id = 'f36c3dbb-f2b1-4edc-814f-09b014b7a1b8';
        const title = 'What to learn';
        todolistsAPI.updateTodolistTitle(id, title)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '912911e6-84ce-4e56-b16e-25c16b1f0720';
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'd9ac3bef-fb2c-49b8-b201-e0c805ac01da';
        const title = 'New task sent from storybook';
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
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
export const updateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'f36c3dbb-f2b1-4edc-814f-09b014b7a1b8';
        const taskId = '';
        const title = 'React JS';
        todolistsAPI.updateTaskTitle(todolistId, taskId, title)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
