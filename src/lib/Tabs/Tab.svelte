<script lang="ts" context="module">
	import { createTabs } from '@melt-ui/svelte';
	import { getContext, onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> & {
		key: string;
	};
</script>

<script lang="ts">
	let { key, children, class: tabClass, ...restProps }: Props = $props();

	const { trigger, onTabMount } = getContext<{
		trigger: ReturnType<typeof createTabs>['elements']['trigger'];
		onTabMount: (key: string) => void;
	}>('TABS');

	let triggerProps = $derived($trigger(key));

	onMount(() => {
		onTabMount(key);
	});
</script>

<div class="p-tabs__item {tabClass ?? ''}" {...restProps}>
	<!-- svelte-ignore a11y_role_supports_aria_props_implicit -->
	<button
		class="p-tabs__link"
		aria-controls="{key}-tab"
		id={key}
		{...triggerProps}
		use:triggerProps.action
		aria-selected={triggerProps['data-state'] === 'active'}
	>
		{#if children}
			{@render children()}
		{/if}
	</button>
</div>
