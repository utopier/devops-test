/* eslint-disable */
/** @jsx jsx */
import {jsx, css} from '@emotion/core'
import Button from '../Button/Button'

type TodoCardProps = {
    /** Todo text */
    text: string;
    /** Todo done */
    done: boolean;
    /** deleteTodo function */
    remove?: () => void;
    /** toggleTodo function */
    toggle?: () => void;
}

/** TodoCard 컴포넌트는 각각의 TodoItem으로 렌더링됨 */
const TodoCard = ({text, done, remove, toggle}:TodoCardProps) => {
    return (
        <div css={style}>
            <Button children="삭제" onClick={remove} theme={'deleteTodo'}/>
            <span 
                style={{
                textDecoration: done ? 'line-through' : 'none'
                }} 
                onClick={toggle}
                >
                {text}
            </span>
        </div>
    )
}

const style = css`
height: 50px;
border: 1px solid black;
border-radius: 5px;
display:flex;
align-items:center;
background-color: #232931;
color: #eeeeee;
padding: 10px;
margin: 5px;
button {
  border-radius: 5px;
  background-color: #d7385e;
  color: #eeeeee;   
}
span {
  padding-left: 10px;
  line-height: 1.5;
  font-size: 1.3rem;
}
`

export default TodoCard;