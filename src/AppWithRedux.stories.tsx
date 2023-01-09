import {action} from '@storybook/addon-actions';
import React from 'react';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

export default {
    title: 'AppWithRedux component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

const onChangeTitleCallback = action('Title changed');

export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux/>
};