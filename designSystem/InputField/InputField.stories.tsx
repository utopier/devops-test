/* eslint-disable */
import React from 'react'
import InputField from './InputField'

export default {
    title: 'components/InputField',
    component: InputField
}

export const inputField = () => {
    return <InputField type="text" placeholder="...input field"/>
}

inputField.story = {
    name: 'Default'
}

export const TodoInputField = () => {
    return <InputField type="text" placeholder="할일을 입력하세요."/>

}
