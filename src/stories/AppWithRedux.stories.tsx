import {action} from '@storybook/addon-actions';
import React from 'react';
import App from '../app/App';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

export default {
    title: 'App component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

const onChangeTitleCallback = action('Title changed');

export const AppWithReduxBaseExample = (props: any) => {
    return <App/>
};