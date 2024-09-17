<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$lib/utils/uniqueId.js';

	export type Props = HTMLInputAttributes & {
		children?: Snippet;
		type?: 'inline' | 'heading';
	};
</script>

<script lang="ts">
	let {
		children,
		id,
		value,
		class: radioClass,
		type,
		//@ts-ignore
		group = $bindable(),
		...restProps
	}: Props = $props();

	let labelId = $derived(`${id ?? uniqueId('radio-')}-label`);
</script>

<label
	for={id}
	class:p-radio={!type}
	class:p-radio--inline={type === 'inline'}
	class:p-radio--heading={type === 'heading'}
	class={radioClass ?? ''}
>
	<input
		type="radio"
		aria-labelledby={labelId}
		class="p-radio__input"
		bind:group
		{value}
		{...restProps}
	/>
	{#if children}
		<span class="p-radio__label" id={labelId}>
			{@render children()}
			{type}
		</span>
	{/if}
</label>
