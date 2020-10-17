/* eslint-disable */

// mock function
describe('mock function', () => {
	const mockCallback = jest.fn((n) => 10 + n);
	[3, 6].forEach((n) => mockCallback(n));
	it('mock function is called twice', () => {
		expect(mockCallback.mock.calls.length).toBe(2);
	});
	it('first argument was 3', () => {
		expect(mockCallback.mock.calls[0][0]).toBe(3);
	});
	it('second argument was 6', () => {
		expect(mockCallback.mock.calls[1][0]).toBe(6);
	});
	it('first return value was 13', () => {
		expect(mockCallback.mock.results[0].value).toBe(13);
	});
});

// .mock property
describe('.mock property', () => {
	const mockFunc = jest.fn((name, age) => {
		return {
			name,
			age,
		};
	});
	const players = [
		{
			name: 'son',
			age: 30,
		},
		{
			name: 'lee',
			age: 21,
		},
	];
	players.forEach(({ name, age }) => mockFunc(name, age));
	it('mockFunc 호출 횟수 : 2', () => {
		expect(mockFunc.mock.calls.length).toBe(2);
	});
	it('mockFun 첫번째 player : son, 30', () => {
		expect(mockFunc.mock.calls[0][0]).toEqual('son', 30);
	});
	it('mockFunc 두번째 player : lee, 21', () => {
		expect(mockFunc.mock.calls[1][0]).toEqual('lee', 21);
	});
	it('mockFunc 첫번째 return value ', () => {
		expect(mockFunc.mock.results[0].value).toEqual({ name: 'son', age: 30 });
	});
	// instances
	// invocationCallOrder
});

// Mock Return Values
describe('mock return value', () => {
	const mockFunc = jest.fn();
	mockFunc.mockReturnValueOnce('first').mockReturnValueOnce('second').mockReturnValue(false);
	it('mock return value', () => {
		mockFunc();
		expect(mockFunc.mock.results[0].value).toBe('first');
		mockFunc();
		expect(mockFunc.mock.results[1].value).toBe('second');
		mockFunc();
		expect(mockFunc.mock.results[2].value).toBeFalsy();
	});
});

// Mocking Modules
import axios from 'axios';
function getPlayers() {
	return axios.get('/players.json').then((res) => res.data);
}
jest.mock('axios');
describe('mocking modules', () => {
	it('fetch players', () => {
		const players = [
			{ name: 'son', age: 30 },
			{ name: 'lee', age: 21 },
		];
		const res = { data: players };
		axios.get.mockResolvedValue(res);

		return getPlayers().then((data) => expect(data).toEqual(players));
	});
});

// Mock Implementations
describe('mock implementation', () => {
	const mockFunc = jest
		.fn(() => 'default')
		.mockImplementationOnce(() => 'first')
		.mockImplementationOnce(() => 'second');
	it('mock implementation once', () => {
		mockFunc();
		expect(mockFunc.mock.results[0].value).toBe('first');
		mockFunc();
		expect(mockFunc.mock.results[1].value).toBe('second');
		mockFunc();
		expect(mockFunc.mock.results[2].value).toBe('default');
	});
});

// Mock Names
const myMockFn = jest
	.fn()
	.mockReturnValue('default')
	.mockImplementation((n) => 10 + n)
	.mockName('add10');

// Custom Matchers
// // The mock function was called at least once
// expect(mockFunc).toHaveBeenCalled();

// // The mock function was called at least once with the specified args
// expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

// // The last call to the mock function was called with the specified args
// expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

// // All calls and the name of the mock is written as a snapshot
// expect(mockFunc).toMatchSnapshot();

// // The mock function was called at least once
// expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// // The mock function was called at least once with the specified args
// expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

// // The last call to the mock function was called with the specified args
// expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
//   arg1,
//   arg2,
// ]);

// // The first arg of the last call to the mock function was `42`
// // (note that there is no sugar helper for this specific of an assertion)
// expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// // A snapshot will check that a mock was invoked the same number of times,
// // in the same order, with the same arguments. It will also assert on the name.
// expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
// expect(mockFunc.getMockName()).toBe('a mock name');
