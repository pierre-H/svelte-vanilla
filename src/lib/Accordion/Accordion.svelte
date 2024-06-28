<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import { setContext, type Snippet } from 'svelte';

	export type Props = HTMLAttributes<HTMLElement> & {
		multiple?: boolean;
		disabled?: boolean;
		forceVisible?: boolean;
		defaultValue?: string | string[] | undefined;
		value?: string | string[] | undefined;
		onValueChange?: ChangeFn<string | string[] | undefined>;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { createAccordion, createSync, melt } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';

	let {
		multiple,
		disabled,
		forceVisible,
		defaultValue,
		value = $bindable<string | string[] | undefined>(defaultValue),
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
