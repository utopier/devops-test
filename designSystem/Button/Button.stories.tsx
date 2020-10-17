/* eslint-disable */
import React from 'react'
import Button from './Button'

export default {
    title: 'components/Button',
    component: Button
}

export const button = () => {
    return <Button>Button</Button>
}

button.story = {
    name: 'Default'
}

export const addTodoButton = () => {
    return <Button theme="addTodo">등록</Button>
}

export const deleteTodoButton = () => {
    return <Button theme="deleteTodo">삭제</Button>
}