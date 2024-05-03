<script lang="ts" context="module">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { uniqueId } from '../utils/uniqueId';

	export type Props = HTMLInputAttributes & {
		children?: Snippet;
		type?: 'inline' | 'heading';
	};
</script>

<script lang="ts">
	let {
		children,
		id,
		checked = $bindable(),
		value,
		class: checkboxClass,
		type,
		...restProps
	}: Props = $props();

	let labelId = $derived(`${id ?? uniqueId('checkbox-')}-label`);
</script>

<label
	class:p-checkbox={!type}
	class:p-checkbox--inline={type === 'inline'}
	class:p-checkbox--heading={type === 'heading'}
	class={checkboxClass ?? ''}
>
	<input
		type="checkbox"
		aria-labelledby={labelId}
		class="p-checkbox__input"
		bind:checked
		{value}
		{...restProps}
	/>
	{#if children}
		<span class="p-checkbox__label" id={labelId}>
			{@render children()}
			{type}
		</span>
	{/if}
</label>
