import {ToDoListType} from '../../App';

export const todolistsReducer = (state: ToDoListType[], action: tsarType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }
            case 'ADD-TODOLIST': {
                 const newToDoList: ToDoListType = {
                    id: action.payload.newToDoListID1,
                    title: action.payload.newTodolistTitle,
                    filter: 'All',
                }
                return [...state, newToDoList]
            }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId2
                ? {...el, title: action.payload.newTodolistTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.todolistId2
            ? {...el, filter: action.payload.newFilter} : el)
        }
        default:
            return state
    }
}

type tsarType = removeTodolistsACType | addTodolistsACType | changeTodolistTitleACType | changeTodolistFilterACType

type removeTodolistsACType = ReturnType<typeof removeTodolistsAC>

export const removeTodolistsAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId1}
    } as const
}

type addTodolistsACType = ReturnType<typeof addTodolistsAC>

export const addTodolistsAC = (newToDoListID1: string, newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle, newToDoListID1}
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId2, newTodolistTitle}
    } as const
}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const changeTodolistFilterAC = (todolistId2: string, newFilter: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId2, newFilter}
    } as const
}