describe('My First Test', () => {
	// 성공
	it('Does not do much!', () => {
		expect(true).to.equal(true);
	});
	// 실패
	// it('Does not do much!', () => {
	// 	expect(true).to.equal(false);
	// });
});

describe('Write a real test', () => {
	it('Click the link "TodoApp" and todo input value', () => {
		// 1. 웹사이트 방문
		cy.visit('/');
		// 테스트 중지
		// cy.pause();
		// 2. element 찾아서 Click
		cy.contains('TodoApp').click();
		// 3. URL 확인
		cy.url().should('include', 'todoapp');
		// 4. input값 변경 및 input값 확인
		cy.get('.todo-field').type('first todo').should('have.value', 'first todo');
	});
});
