/* eslint-disable */
// callback
it('callback test', (done) => {
	function callback(data) {
		try {
			expect(data).toBe('callback');
			done();
		} catch (e) {
			done(e);
		}
	}
	callback('callback');
});

// promise
function fetchDataPromise() {
	return new Promise(function (resolve, reject) {
		const data = 'promise';
		resolve(data);
		reject(new Error('error'));
	});
}

it('promise test', () => {
	return fetchDataPromise().then((data) => {
		expect(data).toBe('promise');
	});
});
// it('promise error test', () => {
// 	expect.assertions(1);
// 	return fetchDataPromise().catch((e) => expect(e).toMatch('error'));
// });
it('promise resolves test', () => {
	return expect(fetchDataPromise()).resolves.toBe('promise');
});
// it('promise rejects test', () => {
// 	return expect(fetchDataPromise()).rejects.toMatch('error');
// });

// async/await
function fetchDataAsync() {
	return new Promise(function (resolve, reject) {
		const data = 'async await';
		resolve(data);
		reject(new Error('error'));
	});
}
it('async await test', async () => {
	const data = await fetchDataAsync();
	expect(data).toBe('async await');
});
// it('async await test2', async () => {
// 	expect.assertions(1);
// 	try {
// 		await fetchDataAsync();
// 	} catch (e) {
// 		expect(e).toMatch('error');
// 	}
// });
it('async await resloves', async () => {
	await expect(fetchDataAsync()).resolves.toBe('async await');
});
// it('async await rejects', async () => {
// 	await expect(fetchDataAsync()).rejects.toThrow('error');
// });
