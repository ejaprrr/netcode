<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="post" use:enhance>
	<slot />
</form>
