//import {action} from '@storybook/addon-actions';
import React from 'react';
import {App} from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';
import {withRouter} from 'storybook-addon-react-router-v6';

export default {
    title: 'Application component',
    component: App,
    decorators: [ReduxStoreProviderDecorator, withRouter]
}

//const onChangeTitleCallback = action('Title changed');

export const AppBaseExample = () => {
    return <App/>
};