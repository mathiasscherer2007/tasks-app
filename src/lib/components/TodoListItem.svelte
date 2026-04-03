<script>
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/utils/formatDate';
	import { fly, slide } from 'svelte/transition';

	const { description, id, done, createdAt } = $props();

	let editing = $state(false);

	function editTask() {
		editing = !editing;
	}
</script>

<li
	in:fly|global={{ duration: 500 }}
	out:slide|global={{ duration: 500, axis: 'y' }}
	class="dark:bg-slate-700 bg-gray-200 p-2 px-3 rounded my-1"
>
	{#if editing}
		<form
			method="POST"
			action="?/edit"
			use:enhance={() => {
				return async ({ update }) => {
					await update();
					editTask();
				};
			}}
			class="w-full flex items-center gap-3"
		>
			<input type="hidden" name="id" value={id} />
			<div class="flex-1 flex">
				<input
					class="text-lg font-semibold p-3 border flex-1 rounded"
					value={description}
					name="description"
					autocomplete="off"
					type="text"
					required
				/>
			</div>
			<div class="max-w-1/5 min-w-44 grid grid-cols-2 gap-2 flex-1">
				<button
					class="border cursor-pointer bg-emerald-400 dark:bg-emerald-500 rounded p-3 py-4 hover:bg-emerald-500 dark:hover:bg-emerald-600 transition"
					aria-label="submit edit">Apply</button
				>
				<button
					onclick={editTask}
					type="button"
					class="border cursor-pointer bg-red-400 dark:bg-rose-500 rounded p-3 py-4 hover:bg-red-500 dark:hover:bg-rose-700 transition"
					aria-label="cancel edit">Cancel</button
				>
			</div>
		</form>
	{:else}
		<form
			method="POST"
			action="?/delete"
			class="w-full flex items-center justify-between"
			use:enhance
		>
			<input type="hidden" name="id" value={id} />
			<div class="grid grid-rows-2 flex-1">
				<div class="text-lg font-semibold {done ? 'line-through' : ''}">
					{description}
				</div>
				<div
					class="italic text-sm my-auto text-gray-600 dark:text-gray-300 {done
						? 'line-through'
						: ''}"
				>
					Created at: {formatDate(createdAt)}
				</div>
			</div>
			<div class="max-w-1/5 min-w-44 grid gap-2 flex-1 {done ? 'grid-cols-2' : 'grid-cols-3'}">
				{#if !done}
					<button
						onclick={editTask}
						type="button"
						class="border cursor-pointer bg-transparent rounded p-3 py-4 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
						aria-label="edit task">Edit</button
					>
				{/if}
				<button
					formaction="?/toggleDone"
					class="border cursor-pointer bg-blue-400 dark:bg-blue-500 rounded p-3 py-4 hover:bg-blue-500 dark:hover:bg-blue-600 transition"
					aria-label="mark as complete"
				>
					{done ? 'Undone' : 'Done'}
				</button>
				<button
					class="border cursor-pointer bg-red-400 dark:bg-rose-500 rounded p-3 py-4 hover:bg-red-500 dark:hover:bg-rose-700 transition"
					aria-label="delete todo">Delete</button
				>
			</div>
		</form>
	{/if}
</li>
