import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const [todolists, setTodolist] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]);
    const [tasks, setTask] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML5', isDone: true},
            {id: v1(), title: 'SCSS', isDone: false},
            {id: v1(), title: 'JS ES6', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Monitor', isDone: false},
            {id: v1(), title: 'Computer', isDone: true},
            {id: v1(), title: 'Headphones', isDone: false}
        ]
    });

    const removeTask = (id: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id);
        setTask({...tasks});
    };
    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        tasks[todolistId] = [newTask, ...tasks[todolistId]];
        setTask({...tasks});
    };
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolist([...todolists]);
        }
    };
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const task = tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTask({...tasks});
        }
    };
    const removeTodolist = (todolistId: string) => {
        const filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
        setTodolist(filteredTodolists);
        delete tasks[todolistId];
        setTask({...tasks});
    };
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = title;
            setTodolist([...todolists]);
        }
    };
    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {id: v1(), title: title, filter: 'all'};
        setTodolist([newTodolist, ...todolists]);
        setTask({...tasks, [newTodolist.id]: []});
    };
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        const task = tasks[todolistId].find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTask({...tasks});
        }
    };

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton
                        edge={'start'}
                        color={'inherit'}
                        aria-label={'menu'}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>News</Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    style={{padding: '20px'}}
                >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        filter={tl.filter}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
