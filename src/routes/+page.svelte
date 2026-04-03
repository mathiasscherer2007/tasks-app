<script lang="ts">
	import { enhance } from '$app/forms';
	import TodoListItem from '$lib/components/TodoListItem.svelte';

	let { data, form } = $props();
</script>

{#if form?.error}
	{alert(form.error)}
{/if}

<div class="w-screen h-screen p-10">
	<h1 class="w-fit text-3xl font-bold mb-5 text-transparent bg-clip-text bg-linear-to-l from-purple-500 to-indigo-600">TODOS</h1>
	<div class="w-1/2 flex flex-col">
		<form class="flex-1 flex gap-3" method="POST" action="?/create" use:enhance>
			<input
				name="description"
				value={form?.description ?? ''}
				autocomplete="off"
				type="text"
				placeholder="Add a todo"
				required
				class="p-3 flex-1 border rounded focus:outline-2 focus:outline-indigo-500"
			/>
			<button class="rounded px-4 bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600">Add</button>
		</form>

		<ul class="w-full my-5 flex flex-col gap-2 p-2">
			{#if data.todos.length > 0}
				{#each data.todos as todo (todo.id)}
					<TodoListItem description={todo.description} id={todo.id} createdAt={todo.createdAt} />
				{/each}
			{:else}
				<li class="text-gray-500 italic">no data do display :(</li>
			{/if}
		</ul>
	</div>
</div>
