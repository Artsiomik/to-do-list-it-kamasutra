import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import ButtonAppBar from './Components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@material-ui/core/Grid';
import {Paper} from '@mui/material';


export type FilterValueType = 'All' | 'Active' | 'Completed';

type ToDoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const changeStatus = (taskId: string, isDone: boolean, ToDoListID: string) => {
        // let tasks = tasksObj[ToDoListID]
        // let task = tasks.find(el => (el.id === taskId)
        // )
        // if (task) {
        //     task.isDone = isDone
        //     setTasksObj({...tasksObj})
        // } -- можно так реализовать, но строка ниже более проще через тернарное вырвжение
        setTasksObj({
            ...tasksObj,
            [ToDoListID]: tasksObj[ToDoListID].map(maped => maped.id === taskId ? {...maped, isDone: isDone} : maped)
        })
    }

    const changeStatusTitle = (taskId: string, newTitle: string, ToDoListID: string) => {
        let tasks = tasksObj[ToDoListID]
        let task = tasks.find(el => (el.id === taskId)
        )
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }

    const changeFilterHandler = (value: FilterValueType, ToDoListID: string) => {

        // const toDoList = toDoLists.find(el => el.id === ToDoListID)
        // if (toDoList) {
        //     toDoList.filter = value
        //     setToDoLists([...toDoLists])
        // } -- можно так реализовать, но строка ниже более проще через тернарное вырвжение
        setToDoLists(toDoLists.map(maped => maped.id === ToDoListID
            ? {...maped, filter: value}
            : maped))
    }


    const removeToDoListHandler = (ToDoListID: string) => {
        let filteredToDoList = toDoLists.filter(el => el.id !== ToDoListID)
        setToDoLists(filteredToDoList)
        delete tasksObj[ToDoListID]
        setTasksObj(tasksObj)
    }

    const changeToDoListTitle = (ToDoListID: string, NewTitle: string) => {
        const toDoList = toDoLists.find(el => el.id === ToDoListID)
        if (toDoList) {
            toDoList.title = NewTitle
            setToDoLists([...toDoLists])
        }
    }

    const removeTask = (id: string, ToDoListID: string) => {
        // let tasks = tasksObj[ToDoListID]
        // tasksObj[ToDoListID] = tasks.filter((el) => el.id !== id)
        // setTasksObj({...tasksObj}) -- можно так реализовать, но строка ниже более проще
        setTasksObj({...tasksObj, [ToDoListID]: tasksObj[ToDoListID].filter((el) => el.id !== id)})
    }

    const addTask = (newTitle: string, ToDoListID: string) => {
        // let newTask = {id: v1(), title: newTitle, isDone: false};
        // let tasks = tasksObj[ToDoListID]
        // tasksObj[ToDoListID] = [newTask, ...tasks]
        // setTasksObj({...tasksObj}) -- можно так реализовать, но 2 строки ниже более проще
        const newTask = {id: v1(), title: newTitle, isDone: false};
        setTasksObj({...tasksObj, [ToDoListID]: [newTask, ...tasksObj[ToDoListID]]})
    }

    const ToDoListID1 = v1();
    const ToDoListID2 = v1();

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: ToDoListID1, title: 'What to learn', filter: 'All'},
        {id: ToDoListID2, title: 'What to buy', filter: 'All'},
    ])

    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [ToDoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [ToDoListID2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Choco', isDone: true}
        ],
    })

    const addToDoList = (title: string) => {
        const toDoList: ToDoListType = {
            id: v1(),
            title: title,
            filter: 'All',
        }
        setToDoLists([toDoList, ...toDoLists])
        setTasksObj({
            ...tasksObj,
            [toDoList.id]: []
        })
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                {toDoLists.map((el) => {

                    let filteredTask = tasksObj[el.id]

                    if (el.filter === 'Active') {
                        filteredTask = filteredTask.filter((el) => !el.isDone)
                    }
                    if (el.filter === 'Completed') {
                        filteredTask = filteredTask.filter((el) => el.isDone)
                    }

                    return (
                        <Grid item>
                            <Paper style={{padding:'10px'}}>
                        <Todolist
                            id={el.id}
                            key={el.id}
                            title={el.title}
                            filter={el.filter}
                            addTask={addTask}
                            tasksObj={filteredTask}
                            removeTask={removeTask}
                            changeFilterHandler={changeFilterHandler}
                            changeStatusTitle={changeStatusTitle}
                            changeStatus={changeStatus}
                            removeToDoListHandler={removeToDoListHandler}
                            changeToDoListTitle={changeToDoListTitle}
                        />
                            </Paper>
                        </Grid>)
                })}
                </Grid>
            </Container>
        </div>
);
}

export default App;
