import { useState, useCallback, memo } from 'react';
import styled from '@emotion/styled';

import InputField from '../../designSystem/InputField/InputField';
import Button from '../../designSystem/Button/Button';

const TodoFormWrapper = styled.div`
	height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
	input {
		width: 100%;
		height: 30px;
		border-radius: 5px;
	}
	form {
		width: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

type TodoFormProps = {
	onInsert: (text: string) => void;
};

const TodoForm = ({ onInsert }: TodoFormProps) => {
	const [value, setValue] = useState('');
	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);
	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			onInsert(value);
			setValue('');
			e.preventDefault(); // 새로고침을 방지함
		},
		[onInsert, value]
	);

	return (
		<TodoFormWrapper>
			<form onSubmit={onSubmit}>
				<InputField className="todo-field" placeholder="할일을 입력하세요..." value={value} onChange={onChange} />
				<Button type="submit">등록</Button>
			</form>
		</TodoFormWrapper>
	);
};

export default memo(TodoForm);
