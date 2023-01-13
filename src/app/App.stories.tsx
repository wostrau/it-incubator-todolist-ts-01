import {action} from '@storybook/addon-actions';
import React from 'react';
import {App} from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';

export default {
    title: 'App component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

const onChangeTitleCallback = action('Title changed');

export const AppBaseExample = (props: any) => {
    return <App/>
};