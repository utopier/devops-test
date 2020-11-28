import { useCallback, memo } from 'react';
import styled from '@emotion/styled';
import { Todo } from '../TodoList/TodoList';

import TodoCard from '../../designSystem/TodoCard/TodoCard';

const TodoItemWrapper = styled.li`
  height: 50px;
  margin: 5px;
  button {
    width: 60px;
  }
`;

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number, done: boolean) => void;
  onRemove: (id: number) => void;
};

const TodoItem = ({ todo, onToggle, onRemove }: TodoItemProps) => {
  const { id, text, done } = todo;
  const toggle = useCallback(() => onToggle(id, done), [id, done, onToggle]);
  const remove = useCallback(() => onRemove(id), [id, onRemove]);

  return (
    <TodoItemWrapper>
      {/* <button onClick={remove}>삭제</button>
      <span
        style={{
          textDecoration: done ? 'line-through' : 'none'
        }}
        onClick={toggle}
      >
        {text}
      </span> */}
      <TodoCard text={text} done={done} remove={remove} toggle={toggle} />
    </TodoItemWrapper>
  );
};

export default memo(TodoItem);
