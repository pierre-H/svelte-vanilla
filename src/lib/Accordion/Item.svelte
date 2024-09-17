<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import { type Snippet } from 'svelte';

	export type Props = HTMLAttributes<HTMLLIElement> & {
		disabled?: boolean;
		heading?: string | Snippet;
		headElement?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		hasTick?: boolean;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { uniqueId } from '$lib/utils/uniqueId.js';
	import { melt } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';

	const { content, item, trigger, isSelected } = getContext<any>('ACCORDION');

	let {
		children,
		heading,
		headElement = 'div',
		hasTick,
		disabled,
		class: accordionItemClass,
		id,
		...restProps
	}: Props = $props();

	let accordionItemId = $derived(id ?? uniqueId('accordion-item-'));

	let headIsDiv = $derived(headElement === 'div');
</script>

<li
	class="p-accordion__group {accordionItemClass}"
	{id}
	{...restProps}
	use:melt={$item(accordionItemId)}
>
	<svelte:element
		this={headElement}
		class="p-accordion__heading"
		role={headIsDiv ? 'head' : undefined}
		aria-level={headIsDiv ? 3 : undefined}
		><button class="p-accordion__tab" use:melt={$trigger({ value: accordionItemId, disabled })}>
			{#if typeof heading === 'string'}
				{heading}
			{:else if heading}
				{@render heading()}
			{/if}
		</button></svelte:element
	>
	{#if $isSelected(accordionItemId)}
		<section
			class="p-accordion__panel"
			class:has-tick-elements={hasTick}
			use:melt={$content(accordionItemId)}
			transition:slide={{ duration: 200 }}
		>
			<div>
				{#if children}
					{@render children()}
				{/if}
			</div>
		</section>
	{/if}
</li>
