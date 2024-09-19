<script lang="ts">
	import Combobox from '$lib/Form/Combobox.svelte';

	let choices = $state([]);
</script>

<Combobox
	name="test"
	label="Coucou"
	helpText="Ceci est un test"
	items={[
		{
			label: 'Europe',
			key: 'europe',
			items: [
				{ label: 'France', value: 'fr' },
				{ label: 'Belgique', value: 'be', disabled: true },
				{ label: 'Allemagne', value: 'de' },
				{ label: 'Italie', value: 'it' },
				{ label: 'Espagne', value: 'es' },
				{ label: 'Portugal', value: 'pt' }
			]
		},
		{
			label: 'Amérique',
			key: 'america',
			items: [
				{ label: 'États-Unis', value: 'us' },
				{ label: 'Canada', value: 'ca' }
			]
		},
		{
			label: 'Asie',
			key: 'asia',
			items: [
				{ label: 'Chine', value: 'cn' },
				{ label: 'Japon', value: 'jp' }
			]
		}
	]}
	multiple
	placeholder="Coucou"
	bind:selected={choices}
>
	{#snippet children(item)}
		<div>
			<strong>{item.label}</strong><br />
			A country
		</div>
	{/snippet}
</Combobox>
