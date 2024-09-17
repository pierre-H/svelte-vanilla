<script lang="ts" module>
	import {
		createSync,
		melt,
		type createContextMenu,
		type CreateContextMenuRadioGroupProps
	} from '@melt-ui/svelte';
	import { getContext, setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLSpanElement> &
		Omit<CreateContextMenuRadioGroupProps, 'value'> & {
			value?: string | null;
		};
</script>

<script lang="ts">
	let {
		children,
		class: itemClass,
		defaultValue,
		value = $bindable(defaultValue),
		onValueChange,
		...restProps
	}: Props = $props();

	const contextMenuContext = getContext<{
		createMenuRadioGroup: ReturnType<typeof createContextMenu>['builders']['createMenuRadioGroup'];
	}>('CONTEXT_MENU');

	if (!contextMenuContext?.createMenuRadioGroup) {
		throw new Error('CONTEXT_MENU context not found');
	}

	const { createMenuRadioGroup } = contextMenuContext;

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked },
		states
	} = createMenuRadioGroup({
		defaultValue,
		onValueChange
	});

	setContext('CONTEXT_MENU_RADIO', {
		radioItem,
		isChecked
	});

	const sync = createSync(states);

	$effect(() => {
		sync.value(value, (v) => (value = v));
	});
</script>

<span class="p-contextual-menu__dropdown" use:melt={$radioGroup} aria-hidden="false" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</span>

<style>
	.p-contextual-menu__dropdown:focus-visible {
		outline: none;
	}
</style>
