<script lang="ts">
	import { Button, Modal } from '$lib/index.js';

	let open = $state<boolean>(false);
</script>

<Button onclick={() => (open = true)}>Open modal</Button>

<Modal bind:open header="Confirm delete">
	<p>
		Are you sure you want to delete user "Simon"? This action is permanent and can not be undone.
	</p>
	{#snippet footer()}
		<Button>Cancel</Button>
		<Button kind="negative">Delete</Button>
	{/snippet}
</Modal>
