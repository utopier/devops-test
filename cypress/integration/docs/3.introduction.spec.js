describe('Todo Resource', () => {
	it('Creating a New Todo', () => {
		cy.visit('/todoapp'); // 1.

		cy.get('input.todo-field') // 2.
			.type('My First Todo'); // 3.

		cy.contains('등록') // 6.
			.click(); // 7.

		cy.url() // 8.
			.should('include', '/todoapp');

		cy.contains('My First Todo') // 9.
			.should('contain', 'My First Todo');

		// element asserting
		cy.get('input').should('not.have.value', 'KO');
		cy.contains('Nextjs').should('have.css', 'text-decoration', 'line-through solid rgb(238, 238, 238)');

		// aliases subject
		cy.get('input.todo-field').as('todoInput');
		cy.get('@todoInput').type('aliases ref');
		cy.contains('등록').click();
	});
	// it('Commands Are Asynchronous', () => {
	// 	let username = undefined;

	// 	cy.visit('/');
	// 	cy.get('.user-name').then(($el) => {
	// 		username = $el.text();
	// 	});

	// 	if (username) {
	// 		cy.contains(useranme).click();
	// 	} else {
	// 		cy.contains('My Profile').click();
	// 	}
	// });
});

describe('테스트 작성', () => {
	function add(a, b) {
		return a + b;
	}

	function subtract(a, b) {
		return a - b;
	}

	function divide(a, b) {
		return a / b;
	}

	function multiply(a, b) {
		return a * b;
	}
	context('math', () => {
		it('can add numbers', () => {
			expect(add(1, 2)).to.eq(3);
		});

		it('can subtract numbers', () => {
			expect(subtract(5, 12)).to.eq(-7);
		});

		specify('can divide numbers', () => {
			expect(divide(27, 9)).to.eq(3);
		});

		specify('can multiply numbers', () => {
			expect(multiply(5, 4)).to.eq(20);
		});
	});
});
