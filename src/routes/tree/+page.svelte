<script lang="ts">
	import { Tree } from '$lib/index.js';
</script>

<Tree
	items={[
		{
			key: 'hello',
			label: 'Hello',
			children: [
				{
					key: 'france',
					label: 'France',
					children: [
						{ key: 'bas-rhin', label: 'Bas-Rhin' },
						{ key: 'haut-rhin', label: 'Haut-Rhin' },
						{ key: 'corse', label: 'Corse' }
					]
				},
				{ key: 'uk', label: 'United Kingdom' }
			]
		},
		{ key: 'bye', label: 'Bye' }
	]}
>
	{#snippet children(item)}
		{#if item.key === 'corse'}
			<a href="https://google.fr" target="_blank">CORSE</a>
		{:else}
			{item.label}
		{/if}
	{/snippet}
</Tree>
