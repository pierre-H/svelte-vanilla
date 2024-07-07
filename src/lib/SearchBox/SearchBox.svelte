<script lang="ts" context="module">
	import type { HTMLFormAttributes, HTMLInputAttributes } from 'svelte/elements';

	export type Props = HTMLFormAttributes & {
		searchLabel?: string;
		closeLabel?: string;
		placeholder?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		value?: string;
		onchange?: HTMLInputAttributes['onchange'];
		onblur?: HTMLInputAttributes['onblur'];
	};
</script>

<script lang="ts">
	import Icon from '$lib/Icon/Icon.svelte';

	let {
		class: searchBoxClass,
		searchLabel = 'Search',
		closeLabel = 'Close',
		placeholder = searchLabel,
		autocomplete = 'on',
		value = $bindable(''),
		onchange,
		onblur,
		children,
		...restProps
	}: Props = $props();
</script>

<form class="p-search-box {searchBoxClass ?? ''}" {...restProps}>
	<label class="u-off-screen" for="search">{searchLabel}</label>
	<input
		type="search"
		id="search"
		class="p-search-box__input"
		name="search"
		{placeholder}
		aria-label={placeholder}
		required
		{autocomplete}
		bind:value
		{onchange}
		{onblur}
	/>
	<button type="reset" class="p-search-box__reset"
		><i class="p-icon--close">
			<Icon name="close">{closeLabel}</Icon>
		</i></button
	>
	<button type="submit" class="p-search-box__button"
		><Icon name="search">{searchLabel}</Icon></button
	>
</form>
