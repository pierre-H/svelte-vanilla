<script lang="ts" context="module">
	import { uniqueId } from '$lib/utils/uniqueId.js';
	import {
		createDropdownMenu,
		createSync,
		melt,
		type CreateDropdownMenuProps
	} from '@melt-ui/svelte';
	import { setContext, type Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type Props = HTMLButtonAttributes &
		Omit<CreateDropdownMenuProps, 'open' | 'portal' | 'arrowSize'> & {
			label: string | Snippet;
			open?: boolean;
		};
</script>

<script lang="ts">
	let {
		children,
		id = uniqueId('dropdown-'),
		class: dropdownClass,
		label,
		forceVisible = true,
		loop,
		dir,
		preventScroll,
		escapeBehavior,
		preventTextSelectionOverflow,
		closeOnOutsideClick,
		defaultOpen,
		open = $bindable(defaultOpen ?? false),
		onOpenChange,
		closeFocus,
		ids,
		positioning = {
			placement: 'bottom-start',
			gutter: 0
		},
		...restProps
	}: Props = $props();

	const {
		elements: { trigger, menu, item, separator },
		builders: { createSubmenu },
		states
	} = createDropdownMenu({
		forceVisible,
		loop,
		portal: null,
		arrowSize: 0,
		positioning,
		dir,
		preventScroll,
		escapeBehavior,
		preventTextSelectionOverflow,
		closeOnOutsideClick,
		onOpenChange,
		defaultOpen,
		ids
	});

	setContext('NAVIGATION_DROPDOWN', {
		item,
		separator,
		createSubmenu
	});

	const sync = createSync(states);

	$effect(() => {
		sync.open(open, (o) => (open = o));
	});
</script>

<li class="p-navigation__item--dropdown-toggle {dropdownClass ?? ''}" class:is-active={open} {id}>
	<button aria-controls="{id}-menu" class="p-navigation__link" {...restProps} use:melt={$trigger}>
		{#if typeof label === 'string'}
			{label}
		{:else}
			{@render label()}
		{/if}
	</button>
	{#if open}
		<ul class="p-navigation__dropdown" id="{id}-menu" aria-hidden={!open} use:melt={$menu}>
			{#if children}
				{@render children()}
			{/if}
		</ul>
	{/if}
</li>

<style>
	.p-navigation__dropdown {
		transform: none !important;
	}
</style>
