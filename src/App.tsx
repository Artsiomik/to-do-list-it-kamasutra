import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';

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
        let tasks = tasksObj[ToDoListID]
        let task = tasks.find(el => (el.id === taskId)
        )
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
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

        const toDoList = toDoLists.find(el => el.id === ToDoListID)
        if (toDoList) {
            toDoList.filter = value
            setToDoList([...toDoLists])
        }
    }

    const removeToDoListHandler = (ToDoListID: string) => {
        let filteredToDoList = toDoLists.filter(el => el.id !== ToDoListID)
        setToDoList(filteredToDoList)
        delete tasksObj[ToDoListID]
        setTasksObj(tasksObj)
    }

    const changeToDoListTitle = (ToDoListID: string, NewTitle: string) => {
        const toDoList = toDoLists.find(el => el.id === ToDoListID)
        if(toDoList){
            toDoList.title = NewTitle
            setToDoList([...toDoLists])
        }
    }

    const removeTask = (id: string, ToDoListID: string) => {
        let tasks = tasksObj[ToDoListID]
        tasksObj[ToDoListID] = tasks.filter((el) => el.id !== id)
        setTasksObj({...tasksObj})
    }

    const addTask = (newTitle: string, ToDoListID: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false};
        let tasks = tasksObj[ToDoListID]
        tasksObj[ToDoListID] = [newTask, ...tasks]
        setTasksObj({...tasksObj})
    }

    const ToDoListID1 = v1();
    const ToDoListID2 = v1();

    const [toDoLists, setToDoList] = useState<Array<ToDoListType>>([
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
        setToDoList([toDoList, ...toDoLists])
        setTasksObj({
            ...tasksObj,
            [toDoList.id]: []
        })
    }

    return (
        <div className="App">

            <AddItemForm addItem={addToDoList}/>

            {toDoLists.map((el) => {

                let filteredTask = tasksObj[el.id]

                if (el.filter === 'Active') {
                    filteredTask = filteredTask.filter((el) => !el.isDone)
                }
                if (el.filter === 'Completed') {
                    filteredTask = filteredTask.filter((el) => el.isDone)
                }

                return (
                    <Todolist
                        id={el.id}
                        key={el.id}
                        title={el.title}
                        addTask={addTask}
                        tasksObj={filteredTask}
                        removeTask={removeTask}
                        changeFilterHandler={changeFilterHandler}
                        changeStatusTitle={changeStatusTitle}
                        changeStatus={changeStatus}
                        filter={el.filter}
                        removeToDoListHandler={removeToDoListHandler}
                        changeToDoListTitle={changeToDoListTitle}
                    />)
            })}


        </div>
    );
}

export default App;
