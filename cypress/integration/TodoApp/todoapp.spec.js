describe('Navigation Test', () => {
	it('Click the link "TodoApp"', () => {
		cy.visit('/');
		cy.contains('TodoApp').click();
		cy.url().should('include', 'todoapp');
	});
	it('Click the link "Home"', () => {
		cy.contains('Home').click();
		cy.url().should('include', '/');
	});
});

describe('todoapp test', () => {
	it('visit todoapp', () => {
		cy.visit('/todoapp');

		cy.get('h1').should('contain', 'TodoApp');
	});
	it('create todo', () => {
		cy.get('input.todo-field').type('My First Todo');

		cy.contains('등록').click();

		cy.contains('My First Todo').should('contain', 'My First Todo');
	});
	it('toggle todo', () => {
		cy.contains('My First Todo').click().should('have.css', 'text-decoration', 'line-through solid rgb(238, 238, 238)');
	});
	it('delete todo', () => {
		cy.get('ul li:last')
			.should((todo) => {
				todo.find('button').click();
			})
			.should('not.exist');
	});
});

// signup test

// login test
