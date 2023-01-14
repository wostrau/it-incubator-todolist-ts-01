import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItemForm component',
    component: AddItemForm
}

const callback = action('Button \'add\' was pressed inside the form');

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
};

export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm addItem={callback} disabled={true}/>
};