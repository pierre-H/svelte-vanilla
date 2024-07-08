<script lang="ts" context="module">
	import { melt, type createDropdownMenu } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export type Props = HTMLAnchorAttributes & {
		selected?: boolean;
	};
</script>

<script lang="ts">
	let { selected, class: itemClass, children, ...restProps }: Props = $props();

	const { item } = getContext<{
		item: ReturnType<typeof createDropdownMenu>['elements']['item'];
	}>('NAVIGATION_DROPDOWN');
</script>

<li class:is-selected={selected} use:melt={$item}>
	<a class="p-navigation__dropdown-item {itemClass ?? ''}" {...restProps}>
		{#if children}
			{@render children()}
		{/if}
	</a>
</li>
