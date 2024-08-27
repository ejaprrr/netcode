<script lang="ts">
	// $app
	import { enhance } from '$app/forms';
	// $lib
	import ValidatedField from '$lib/components/auth/ValidatedField.svelte';
	import { validateNewTag, validateNewPassword } from '$lib/validation';

	export let form: FormData & { passwordError?: string; tagError?: string };

	$: isFormValid = tagValid && passwordValid;
	let tagValid = false;
	let passwordValid = false;

	async function validateTag(tag: string): Promise<string | undefined> {
		const response = await fetch(`/api/auth/exists?tag=${tag}`);
		const { exists } = await response.json();
		return exists ? 'tag is already taken' : validateNewTag(tag) || '';
	}

	async function validatePassword(password: string): Promise<string | undefined> {
		return validateNewPassword(password) || '';
	}
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

	<button disabled={!isFormValid}>sign up</button>
</form>
