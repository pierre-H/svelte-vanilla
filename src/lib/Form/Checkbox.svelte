<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { uniqueId } from '../utils/uniqueId.js';

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
		//@ts-ignore
		group = $bindable(),
		value,
		class: checkboxClass,
		type,
		...restProps
	}: Props = $props();

	let labelId = $derived(`${id ?? uniqueId('checkbox-')}-label`);
</script>

<label
	for={id}
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
		bind:group
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
