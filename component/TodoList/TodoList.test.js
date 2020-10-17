import React from 'react';
import TodoList from './TodoList';
import { render, fireEvent } from '@testing-library/react';

describe('<TodoList />', () => {
	const sampleTodos = [
		{
			id: 1,
			text: 'Rxjs',
			done: false,
		},
		{
			id: 2,
			text: 'Nextjs',
			done: true,
		},
	];

	it('renders todos properly', () => {
		const { getByText } = render(<TodoList todos={sampleTodos} />);
		getByText(sampleTodos[0].text);
		getByText(sampleTodos[1].text);
	});

	it('calls onToggle and onRemove', () => {
		const onToggle = jest.fn();
		const onRemove = jest.fn();
		const { getByText, getAllByText } = render(
			<TodoList todos={sampleTodos} onToggle={onToggle} onRemove={onRemove} />
		);

		fireEvent.click(getByText(sampleTodos[0].text));
		expect(onToggle).toBeCalledWith(sampleTodos[0].id, sampleTodos[0].done);

		fireEvent.click(getAllByText('삭제')[0]); // 첫번째 삭제 버튼을 클릭
		expect(onRemove).toBeCalledWith(sampleTodos[0].id);
	});
});
