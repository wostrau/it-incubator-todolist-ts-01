import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default {
    title: 'API'
};

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'
    }
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const payload = {title: 'New todolist sent from storybook'}
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', payload, settings)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = 'd9ac3bef-fb2c-49b8-b201-e0c805ac01da';
    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

    }, []);
    return <div>{JSON.stringify(state)}</div>
};