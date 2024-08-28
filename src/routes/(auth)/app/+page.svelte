<script lang="ts">
	export const logOutUser = async () => {
		const response = await fetch('/api/auth/log-out');
		if (response.ok) {
			location.reload();
		}
	};
	export let data;
</script>

<button on:click={logOutUser}>log out</button>
<span>{data.userId}</span>
