import type { Todo } from './types/todo';

// Simulates a database
const db = new Map();

function checkDuplicateDescription(todos: Array<Todo>, description: string | FormDataEntryValue) {
	if (todos.find((todo: Todo) => todo.description === description)) {
		throw new Error('todos must be unique');
	}
}

export function getTodos(userid: string) {
	if (!db.get(userid)) {
		// No primeiro get de um usuário, adiciona uma task "Welcome!"
		db.set(userid, [
			{
				id: crypto.randomUUID(),
				description: 'Welcome!',
				done: false,
				createdAt: Date()
			}
		]);
	}

	return db.get(userid);
}

export function createTodo(userid: string, description: FormDataEntryValue) {
	if (description === '') {
		throw new Error('todos must have a description');
	}

	const todos = db.get(userid);

	checkDuplicateDescription(todos, description);

	todos.push({
		id: crypto.randomUUID(),
		description: description,
		done: false,
		createdAt: Date()
	});
}

export function deleteTodo(userid: string, todoid: FormDataEntryValue) {
	const todos = db.get(userid);
	const index = todos.findIndex((todo: Todo) => todo.id === todoid);

	if (index !== -1) {
		todos.splice(index, 1);
	}
}

export function editTodo(
	userid: string,
	todoid: FormDataEntryValue,
	newDescription: FormDataEntryValue
) {
	if (newDescription === '') {
		throw new Error("new description can't be empty");
	}

	const todos = db.get(userid);
	const index = todos.findIndex((todo: Todo) => todo.id === todoid);

	checkDuplicateDescription(todos, newDescription);

	todos[index].description = newDescription;
}

// TODO: add subtasks to todos.
// TODO: pin TODOS so they appear on top of the list.