<script lang="ts">
	// $lib
	import ValidatedField from '$lib/components/auth/ValidatedField.svelte';
	import { validateTag, validatePassword } from '$lib/auth';

	export let form: FormData & { passwordError?: string; tagError?: string };

	$: isFormValid = tagValid && passwordValid;
	let tagValid = false;
	let passwordValid = false;
</script>

<ValidatedField validate={validateTag} name="tag" bind:isValid={tagValid} error={form?.tagError} />

<ValidatedField
	validate={validatePassword}
	name="password"
	type="password"
	bind:isValid={passwordValid}
	error={form?.passwordError}
/>

<button disabled={!isFormValid}>log in</button>
