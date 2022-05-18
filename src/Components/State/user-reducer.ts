type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':{
            const copyState = {...state}
            copyState.age = copyState.age + 1;
            return copyState;}
        case 'INCREMENT-CHILDREN-COUNT':{
            const copyState = {...state}
            copyState.childrenCount = copyState.childrenCount + 1;
            return copyState}
        case 'CHANGE-NAME': {
            const copyState = {...state}
            return {...copyState, name:action.newName}
        }
        default:
            throw new Error("I don't understand this type")
    }
}
