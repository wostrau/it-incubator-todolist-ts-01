import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItemForm component',
    component: AddItemForm
}

const asyncCallback = async (...param: any[]) => {
    action('Button \'add\' was pressed inside the form')(...param);
};

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={asyncCallback}/>
};

export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm addItem={asyncCallback} disabled={true}/>
};