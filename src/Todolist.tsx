import React, {ChangeEvent} from 'react';
import {FilterValueType} from './App'
import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './Components/EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasksObj: Array<TaskType>
    removeTask: (id: string, ToDoListID: string) => void
    changeFilterHandler: (value: FilterValueType, ToDoListID: string) => void
    addTask: (newTitle: string, ToDoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, ToDoListID: string) => void
    changeStatusTitle: (taskId: string, newTitle: string, ToDoListID: string) => void
    filter: FilterValueType
    removeToDoListHandler: (ToDoListID: string) => void
    changeToDoListTitle: (ToDoListID: string, NewTitle: string) => void
}


export function Todolist(props: PropsType) {

    const removeToDoListHandler = () => {
        props.removeToDoListHandler(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeToDoListTitle = (NewTitle: string) => {
        props.changeToDoListTitle(props.id, NewTitle)
    }

    return <div>
        <h3> <EditableSpan title={props.title}
                           onChange={changeToDoListTitle}/>
            <button className={'titleDelete'} onClick={removeToDoListHandler}>Delete</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {props.tasksObj.map((el) => {

                const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(el.id, event.currentTarget.checked, props.id)

                }
                const onChangeTitleHandler = (newValue: string) => {
                    props.changeStatusTitle(el.id, newValue, props.id)

                }


                const removeTaskHandler = () => props.removeTask(el.id, props.id)

                return (
                    <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={el.isDone}/>
                        <EditableSpan title={el.title}
                        onChange={onChangeTitleHandler}/>
                        <button className={'delete'} onClick={removeTaskHandler}>Delete</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button className={props.filter === 'All' ? 'active-filter' : ''}
                    onClick={() => props.changeFilterHandler('All', props.id)}>All
            </button>
            <button className={props.filter === 'Active' ? 'active-filter' : ''}
                    onClick={() => props.changeFilterHandler('Active', props.id)}>Active
            </button>
            <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                    onClick={() => props.changeFilterHandler('Completed', props.id)}>Completed
            </button>
        </div>
    </div>
}

