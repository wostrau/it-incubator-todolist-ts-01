import {userReducer} from './user-reducer';

test('user reducer should increment age correctly', () => {
    const startState = {age: 34, childrenCount: 1, name: 'Ales'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});
    expect(endState.age).toBe(35);
    expect(endState.childrenCount).toBe(startState.childrenCount);
});
test('user reducer should increment number of children correctly', () => {
    const startState = {age: 34, childrenCount: 1, name: 'Ales'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});
    expect(endState.age).toBe(startState.age);
    expect(endState.childrenCount).toBe(2);
});
test('user reducer should change name of user correctly', () => {
    const startState = {age: 34, childrenCount: 1, name: 'Ales'};
    const newName = 'Alex';
    const endState = userReducer(startState, {type: 'CHANGE-USER-NAME', newName: newName});
    expect(endState.name === startState.name).toBeFalsy();
    expect(endState.name).toBe(newName);
});