<script lang="ts">
	export let form: FormData & { passwordError?: string; tagError?: string };
</script>

<form method="post">
	<input name="tag" placeholder="tag" />
	<input type="password" name="password" placeholder="password" />
	<button>sign up</button>
</form>

{#if form?.passwordError}
	<p>{form.passwordError}</p>
{/if}

{#if form?.tagError}
	<p>{form.tagError}</p>
{/if}
