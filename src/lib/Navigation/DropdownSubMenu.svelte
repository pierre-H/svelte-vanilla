<script lang="ts" context="module">
	import { melt, type createDropdownMenu } from '@melt-ui/svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> & {
		selected?: boolean;
		label: string | Snippet;
	};
</script>

<script lang="ts">
	import Icon from '$lib/Icon/Icon.svelte';

	let { selected, label, children, ...restProps }: Props = $props();

	const { createSubmenu } = getContext<{
		createSubmenu: ReturnType<typeof createDropdownMenu>['builders']['createSubmenu'];
	}>('NAVIGATION_DROPDOWN');

	const {
		elements: { subMenu, subTrigger },
		states: { subOpen }
	} = createSubmenu({
		arrowSize: 0,
		positioning: {
			gutter: 0,
			placement: 'right-start'
		}
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
	{#if $subOpen}
		<ul
			class="p-navigation__dropdown"
			style="display: block;"
			aria-hidden={!$subOpen}
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
