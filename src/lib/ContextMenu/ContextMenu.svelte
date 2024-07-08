<script lang="ts" context="module">
	import {
		createContextMenu,
		createSync,
		melt,
		type CreateContextMenuProps
	} from '@melt-ui/svelte';
	import { setContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLSpanElement> &
		Omit<CreateContextMenuProps, 'arrowSize' | 'open'> & {
			position?: 'left' | 'center';
			trigger: string | Snippet;
			open?: boolean;
		};
</script>

<script lang="ts">
	let {
		children,
		position,
		trigger,
		forceVisible = true,
		preventScroll,
		escapeBehavior,
		preventTextSelectionOverflow = true,
		portal,
		closeOnOutsideClick,
		loop,
		defaultOpen,
		open = $bindable<boolean>(defaultOpen ?? false),
		onOpenChange,
		ids,
		positioning,
		...restProps
	}: Props = $props();

	const {
		elements: { trigger: triggerElm, menu, item },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states
	} = createContextMenu({
		forceVisible,
		positioning,
		preventScroll,
		escapeBehavior,
		preventTextSelectionOverflow,
		portal,
		closeOnOutsideClick,
		loop,
		defaultOpen,
		onOpenChange,
		ids
	});

	setContext('CONTEXT_MENU', {
		createSubmenu,
		createMenuRadioGroup,
		createCheckboxItem,
		item
	});

	const sync = createSync(states);

	$effect(() => {
		sync.open(open, (o) => (open = o));
	});
</script>

<span
	class:p-contextual-menu={!position}
	class:p-contextual-menu--left={position === 'left'}
	class:p-contextual-menu--center={position === 'center'}
>
	<span use:melt={$triggerElm} {...restProps}>
		{#if typeof trigger === 'string'}
			{trigger}
		{:else}
			{@render trigger()}
		{/if}
	</span>
	<span class="p-contextual-menu__dropdown" use:melt={$menu} aria-hidden={!open}>
		{#if children}
			{@render children()}
		{/if}
	</span>
</span>

<style>
	.p-contextual-menu__dropdown:focus-visible {
		outline: none;
	}
</style>
