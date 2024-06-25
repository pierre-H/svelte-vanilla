<script lang="ts">
	import Combobox from '$lib/Form/Combobox.svelte';
	import Modal from '$lib/Modal/Modal.svelte';

	let choices = $state([]);

	let open = $state(false);
	let open2 = $state(false);
</script>

<div style="width: 100dvw; background: blue; height: 20px; position: sticky; z-index: 10;">
	Test
</div>

<button onclick={() => (open = true)}>Open</button>

<Modal bind:open>
	<form>
		<button type="button" onclick={() => (open2 = true)}>Open</button>
		<Modal bind:open={open2}
			>Hello world <Combobox
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
			</Combobox></Modal
		>

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
	</form>

	{JSON.stringify(choices)}
</Modal>
