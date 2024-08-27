<script lang="ts">
	export let validate: CallableFunction;
	export let name: string;

	export let type: string = 'text';

	// state management
	export let isValid: boolean = false;
	export let error: string = '';

	let value = '';
	let debounceTimer: NodeJS.Timeout | null = null;

	async function validateField() {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			error = value ? ((await validate(value)) ?? '') : '';
			isValid = !error && !!value;
		}, 500);
	}
</script>

<input {name} {...{ type }} bind:value on:input={validateField} />

{#if error}
	<p class="error">{error}</p>
{/if}
