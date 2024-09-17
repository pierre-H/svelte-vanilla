<script lang="ts" module>
	import {
		createDropdownMenu,
		createSync,
		melt,
		type CreateContextSubmenuProps
	} from '@melt-ui/svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLSpanElement> &
		Omit<CreateContextSubmenuProps, 'open'> & {
			trigger: string | Snippet;
			open?: boolean;
		};
</script>

<script lang="ts">
	/**
	 * @see https://github.com/melt-ui/melt-ui/issues/1205
	 */

	let {
		trigger,
		children,
		class: itemClass,
		positioning = {
			placement: 'right-start'
		},
		arrowSize,
		disabled,
		open = $bindable(false),
		onOpenChange,
		...restProps
	}: Props = $props();

	const dropdownMenuContext = getContext<{
		createSubmenu: ReturnType<typeof createDropdownMenu>['builders']['createSubmenu'];
	}>('DROPDOWN_MENU');

	if (!dropdownMenuContext?.createSubmenu) {
		throw new Error('DROPDOWN_MENU context not found');
	}

	const { createSubmenu } = dropdownMenuContext;

	const {
		elements: { subMenu, subTrigger },
		states
	} = createSubmenu({
		positioning,
		arrowSize,
		disabled,
		onOpenChange
	});

	const sync = createSync(states);

	$effect(() => {
		sync.subOpen(open, (o) => (open = o));
	});
</script>

<span class="p-contextual-menu__link {itemClass ?? ''}" {...restProps} use:melt={$subTrigger}>
	{#if typeof trigger === 'string'}
		{trigger}
	{:else}
		{@render trigger()}
	{/if}
</span>

<span class="p-contextual-menu__dropdown" use:melt={$subMenu} aria-hidden={!open}>
	{#if children}
		{@render children()}
	{/if}
</span>

<style>
	.p-contextual-menu__link {
		padding-left: 32px;
	}

	.p-contextual-menu__dropdown:focus-visible,
	.p-contextual-menu__link:focus-visible {
		outline: none;
	}

	.p-contextual-menu__link[data-disabled] {
		cursor: not-allowed;
		opacity: 0.33;
	}
	.p-contextual-menu__link[data-disabled]:hover {
		background: none;
	}
</style>
