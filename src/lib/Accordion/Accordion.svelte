<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import { setContext, type Snippet } from 'svelte';

	export type Props = HTMLAttributes<HTMLElement> &
		Omit<CreateAccordionProps, 'value'> & {
			value?: string | string[];
			children?: Snippet;
		};
</script>

<script lang="ts">
	import { createAccordion, createSync, melt, type CreateAccordionProps } from '@melt-ui/svelte';

	let {
		multiple,
		disabled,
		forceVisible,
		defaultValue,
		value = $bindable<string | string[] | undefined>(defaultValue ?? []),
		children,
		class: accordionClass,
		onValueChange,
		...restProps
	}: Props = $props();

	const {
		elements: { root, content, item, trigger },
		helpers: { isSelected },
		states
	} = createAccordion({
		multiple,
		disabled,
		forceVisible,
		defaultValue,
		onValueChange
	});

	setContext('ACCORDION', {
		content,
		item,
		trigger,
		isSelected
	});

	const sync = createSync(states);

	$effect(() => {
		//@ts-ignore
		sync.value(value, (v) => (value = v));
	});
</script>

<aside class="p-accordion {accordionClass ?? ''}" {...restProps}>
	<ul class="p-accordion__list" use:melt={$root}>
		{#if children}
			{@render children()}
		{/if}
	</ul>
</aside>
