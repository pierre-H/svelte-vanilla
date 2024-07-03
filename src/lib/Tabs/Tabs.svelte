<script lang="ts" context="module">
	import { createSync, createTabs, melt, type CreateTabsProps } from '@melt-ui/svelte';
	import { setContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> &
		Omit<CreateTabsProps, 'value'> & {
			tabs: Snippet;
			children: Snippet;
			openKey?: string;
		};
</script>

<script lang="ts">
	let {
		loop,
		activateOnFocus,
		orientation,
		autoSet = true,
		defaultValue,
		onValueChange,
		openKey = '',
		children,
		class: tabsClass,
		tabs,
		...restProps
	}: Props = $props();

	const {
		elements: { root, list, content, trigger },
		states
	} = createTabs({
		autoSet: false,
		loop,
		activateOnFocus,
		orientation,
		defaultValue,
		onValueChange
	});

	setContext('TABS', {
		trigger,
		content,
		onTabMount: (key: string) => {
			if (autoSet && !openKey) {
				openKey = key;
			}
		}
	});

	const sync = createSync(states);

	$effect(() => {
		sync.value(openKey, (v) => (openKey = v));
	});
</script>

<div class="p-tabs {tabsClass ?? ''}" {...restProps} use:melt={$root}>
	<div class="p-tabs__list" use:melt={$list}>
		{@render tabs()}
	</div>
	{@render children()}
</div>
