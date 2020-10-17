/* eslint-disable */
import React from 'react'
import TodoCard from './TodoCard'

export default {
    title: 'components/TodoCard',
    component: TodoCard
}

export const todoCard = () => {
    return <TodoCard done={false} text="todo example"/>
}

todoCard.story = {
    name: 'Default'
}

