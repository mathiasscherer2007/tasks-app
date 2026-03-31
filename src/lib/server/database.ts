import type { Todo } from './types/todo';

// Simulates a database
const db = new Map();

export function getTodos(userid: string) {
	if (!db.get(userid)) {
		// No primeiro get de um usuário, adiciona uma task "Welcome!"
		db.set(userid, [
			{
				id: crypto.randomUUID(),
				description: 'Welcome!',
				done: false
			}
		]);
	}

	return db.get(userid);
}

export function createTodo(userid: string, description: string | FormDataEntryValue) {
	if (description === '') {
		throw new Error('todos must have a description');
	}

	const todos = db.get(userid);

	if (todos.find((todo: Todo) => todo.description === description)) {
		throw new Error('todos must be unique');
	}

	todos.push({
		id: crypto.randomUUID(),
		description: description,
		done: false
	});

	console.log(todos);
}

export function deleteTodo(userid: string, todoid: FormDataEntryValue) {
	const todos = db.get(userid);
	const index = todos.findIndex((todo: Todo) => todo.id === todoid);

	if (index !== -1) {
		todos.splice(index, 1);
	}
}

// TODO: edit todos.
// TODO: add subtasks to todos.
