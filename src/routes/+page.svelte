<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/utils/formatDate';

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
				<li>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={todo.id} />
						<span><b>{todo.description}</b></span>
						<span>Created at: {formatDate(todo.createdAt)}</span>
						<button class="border px-2" aria-label="mark as complete">X</button>
					</form>
				</li>
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
