<script lang="ts">
	import { Select } from '$lib';

	let value = $state('');
</script>

<Select label="Hello world" name="hello" error="A help text" bind:value dense>
	<option value="world">World</option>
	<option value="universe">Universe</option>
	<option value="everything">Everything</option>
</Select>
