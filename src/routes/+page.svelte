<script lang="ts">
	import { enhance } from '$app/forms';
	import TodoListItem from '$lib/components/TodoListItem.svelte';

	let { data, form } = $props();

	
</script>

{#if form?.error}
	{alert(form.error)}
{/if}

<div class="centered">
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
		<button>Add</button>
	</form>

	<ul>
		{#if data.todos.length > 0}
			{#each data.todos as todo (todo.id)}
				<TodoListItem description={todo.description} id={todo.id} createdAt={todo.createdAt} />
			{/each}
		{:else}
			<li>no data do display</li>
		{/if}
	</ul>
</div>

<style>
	.centered {
		height: 100vh;
		width: fit-content;
		margin: 0 auto;
	}
</style>
