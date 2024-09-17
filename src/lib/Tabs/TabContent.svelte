<script lang="ts" module>
	import { createTabs, melt } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> & {
		key: string;
	};
</script>

<script lang="ts">
	let { key, children, ...restProps }: Props = $props();

	const { content } = getContext<{
		content: ReturnType<typeof createTabs>['elements']['content'];
	}>('TABS');
</script>

<div id="{key}-tab" aria-labelledby={key} use:melt={$content(key)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
