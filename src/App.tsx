import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValuesType = 'All' | 'Active' | 'Completed';

function App() {
    const [tasks, setTask] = useState<TaskType[]>([
        {id: 1, title: 'HTML5', isDone: true},
        {id: 2, title: 'SCSS', isDone: false},
        {id: 3, title: 'Javascript ES6', isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('All');
    const removeTask = (id: number) => {
        setTask(tasks.filter(t => t.id !== id));
    };
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
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
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
