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
        case '1':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        default:
            throw new Error('I don\'t know this type of action');
    }
};