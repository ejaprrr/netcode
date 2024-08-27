<script lang="ts">
	// $app
	import { enhance } from '$app/forms';
	// $lib
	import ValidatedField from '$lib/components/auth/ValidatedField.svelte';
	import { validateTag, validatePassword } from '$lib/validation';

	export let form: FormData & { passwordError?: string; tagError?: string };

	$: isFormValid = tagValid && passwordValid;
	let tagValid = false;
	let passwordValid = false;
</script>

<form method="post" use:enhance>
	<ValidatedField
		validate={validateTag}
		name="tag"
		bind:isValid={tagValid}
		error={form?.tagError}
	/>

	<ValidatedField
		validate={validatePassword}
		name="password"
		type="password"
		bind:isValid={passwordValid}
		error={form?.passwordError}
	/>

	<button disabled={!isFormValid}>log in</button>
</form>
