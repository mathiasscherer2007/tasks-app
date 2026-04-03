<script>
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/utils/formatDate';

	const { description, id, createdAt } = $props();

	let editing = $state(false);

	function editTask() {
		editing = !editing;
	}
</script>

<li>
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
		>
			<input type="hidden" name="id" value={id} />
			<input value={description} name="description" autocomplete="off" type="text" required />
			<button class="border px-2 cursor-pointer" aria-label="submit edit">Ok</button>
			<button
				onclick={editTask}
				type="button"
				class="border px-2 cursor-pointer"
				aria-label="cancel edit">X</button
			>
		</form>
	{:else}
		<form method="POST" action="?/delete" use:enhance>
			<input type="hidden" name="id" value={id} />
			<span><b>{description}</b></span>
			<span>Created at: {formatDate(createdAt)}</span>
			<button
				onclick={editTask}
				type="button"
				class="border px-2 cursor-pointer"
				aria-label="edit task">E</button
			>
			<button class="border px-2 cursor-pointer" aria-label="mark as complete">X</button>
		</form>
	{/if}
</li>
