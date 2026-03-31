<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<div>
	<h1>TODOS</h1>
	<form method="POST" action="?/create" use:enhance>
		<input
			name="description"
			value={form?.description ?? ''}
			autocomplete="off"
			type="text"
			placeholder="Add a todo"
			required
		/>
	</form>

	<ul>
		{#each data.todos as todo (todo.id)}
			<li>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={todo.id} />
                    <span>{todo.description}</span>
                    <button aria-label="mark as complete">R</button>
				</form>
			</li>
		{/each}
	</ul>
</div>
