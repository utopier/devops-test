/* eslint-disable */
// 1.Common matchers
// expect, toBe, toEqual
describe('common matchers', () => {
	it('3+3 = 6', () => {
		expect(3 + 3).toBe(6);
	});
	it('object toEqual()', () => {
		const player = { name: 'son' };
		player.age = 30;
		expect(player).toEqual({ name: 'son', age: 30 });
	});
});

// 2.Truthiness
// toBeNull, toBeUndefined, toBeDefined, toBeTruthy, toBeFalsy
describe('truthiness', () => {
	it('null', () => {
		const n = null;
		expect(n).toBeNull();
		expect(n).toBeDefined();
		expect(n).not.toBeUndefined();
		expect(n).not.toBeTruthy();
		expect(n).toBeFalsy();
	});
	it('num 0', () => {
		const num = 0;
		expect(num).not.toBeNull();
		expect(num).toBeDefined();
		expect(num).not.toBeUndefined();
		expect(num).not.toBeTruthy();
		expect(num).toBeFalsy();
	});
});

// 3. Numbers
// toBeGreatherThan, toBeGreatherThanOrEqual, toBeLessThan, toBeLessThanOrEqual
it('3 + 3', () => {
	const result = 3 + 3;
	expect(result).toBeGreaterThan(5);
	expect(result).toBeGreaterThanOrEqual(5.5);
	expect(result).toBeLessThan(7);
	expect(result).toBeLessThanOrEqual(6.5);

	expect(result).toBe(6);
	expect(result).toEqual(6);
});

// 4. Strings
// toMatch
it('jest in s', () => {
	expect('jest').toMatch(/s/);
});

// 5. Array and iterables
// toContain
const players = ['son', 'lee', 'kwon'];
it('son in players array', () => {
	expect(players).toContain('son');
});

// 6. Exceptions
// toThrow
function test() {
	throw new Error('error test');
}
it('toThrow test', () => {
	expect(test).toThrow('error test');
});
