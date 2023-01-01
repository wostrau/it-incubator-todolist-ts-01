import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'All' | 'Active' | 'Completed';

function App() {
    const [tasks, setTask] = useState<TaskType[]>([
        {id: v1(), title: 'HTML5', isDone: true},
        {id: v1(), title: 'SCSS', isDone: false},
        {id: v1(), title: 'Javascript ES6', isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('All');

    const removeTask = (id: string) => {
        setTask(tasks.filter(t => t.id !== id));
    };
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTask([newTask, ...tasks]);
    };
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    };
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) task.isDone = isDone;
        setTask([...tasks]);
    };

    let tasksForTodolist = tasks;
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                filter={filter}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
