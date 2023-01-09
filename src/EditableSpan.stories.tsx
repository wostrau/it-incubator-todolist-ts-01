import {action} from '@storybook/addon-actions';
import React from 'react';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'EditableSpan component',
    component: EditableSpan
}

const onChangeTitleCallback = action('Title changed');

export const EditableSpanBaseExample = (props: any) => {
    return (
        <>
            <EditableSpan
                title={'HTML5'}
                onChange={onChangeTitleCallback}
            />
        </>
    )
};