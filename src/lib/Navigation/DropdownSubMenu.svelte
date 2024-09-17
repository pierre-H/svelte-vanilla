<script lang="ts" module>
	import {
		createSync,
		melt,
		type createDropdownMenu,
		type CreateDropdownSubmenuProps
	} from '@melt-ui/svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> &
		Omit<CreateDropdownSubmenuProps, 'open' | 'arrowSize'> & {
			selected?: boolean;
			label: string | Snippet;
			open?: boolean;
		};
</script>

<script lang="ts">
	import Icon from '$lib/Icon/Icon.svelte';

	let {
		selected,
		label,
		children,
		positioning = {
			gutter: 0,
			placement: 'right-start'
		},
		onOpenChange,
		ids,
		open = $bindable(false),
		...restProps
	}: Props = $props();

	const { createSubmenu } = getContext<{
		createSubmenu: ReturnType<typeof createDropdownMenu>['builders']['createSubmenu'];
	}>('NAVIGATION_DROPDOWN');

	const {
		elements: { subMenu, subTrigger },
		states
	} = createSubmenu({
		arrowSize: 0,
		positioning,
		onOpenChange,
		ids
	});

	const sync = createSync(states);

	$effect(() => {
		sync.subOpen(open, (o) => (open = o));
	});
</script>

<li class:is-selected={selected}>
	<div
		class="p-navigation__dropdown-item p-navigation__subdropdown-trigger"
		{...restProps}
		use:melt={$subTrigger}
	>
		<div>
			{#if typeof label === 'string'}
				{label}
			{:else}
				{@render label()}
			{/if}
		</div>

		<Icon name="chevron-right" />
	</div>
	{#if open}
		<ul
			class="p-navigation__dropdown"
			style="display: block;"
			aria-hidden={!open}
			use:melt={$subMenu}
		>
			{#if children}
				{@render children()}
			{/if}
		</ul>
	{/if}
</li>

<style>
	.p-navigation__subdropdown-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-navigation__dropdown {
		transform: none !important;
	}
</style>
