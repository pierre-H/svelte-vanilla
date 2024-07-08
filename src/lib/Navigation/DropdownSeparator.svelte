<script lang="ts" context="module">
	import { melt, type createDropdownMenu } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLLIElement>;
</script>

<script lang="ts">
	let props: Props = $props();

	const { separator } = getContext<{
		separator: ReturnType<typeof createDropdownMenu>['elements']['separator'];
	}>('NAVIGATION_DROPDOWN');
</script>

<li use:melt={$separator} {...props}></li>

<style>
	li {
		margin: 5px;
		border: 0.5px var(--vf-color-text-default) solid;
	}
</style>
