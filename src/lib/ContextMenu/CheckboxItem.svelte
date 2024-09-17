<script lang="ts" module>
	import {
		createSync,
		melt,
		type createContextMenu,
		type CreateContextMenuCheckboxItemProps
	} from '@melt-ui/svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type Props = HTMLButtonAttributes &
		Omit<CreateContextMenuCheckboxItemProps, 'checked'> & {
			checked?: boolean | 'indeterminate';
			checkIcon?: IconName | Snippet;
			uncheckIcon?: IconName | Snippet;
		};
</script>

<script lang="ts">
	import { Icon } from '$lib/index.js';
	import type { IconName } from '$lib/Icon/Icon.svelte';

	let {
		children,
		class: itemClass,
		disabled,
		defaultChecked = false,
		checked = $bindable(defaultChecked),
		onCheckedChange,
		checkIcon = 'task-outstanding',
		uncheckIcon,
		...restProps
	}: Props = $props();

	const contextMenuContext = getContext<{
		createCheckboxItem: ReturnType<typeof createContextMenu>['builders']['createCheckboxItem'];
	}>('CONTEXT_MENU');

	if (!contextMenuContext?.createCheckboxItem) {
		throw new Error('CONTEXT_MENU context not found');
	}

	const { createCheckboxItem } = contextMenuContext;

	const {
		elements: { checkboxItem },
		states
	} = createCheckboxItem({
		defaultChecked,
		disabled,
		onCheckedChange
	});

	const sync = createSync(states);

	$effect(() => {
		sync.checked(checked, (c) => (checked = c));
	});
</script>

<button
	class="p-contextual-menu__link {itemClass ?? ''}"
	{...restProps}
	{disabled}
	use:melt={$checkboxItem}
>
	{#if checked}
		{#if typeof checkIcon === 'string'}
			<Icon name={checkIcon} />
		{:else}
			{@render checkIcon()}
		{/if}
	{:else if uncheckIcon}
		{#if typeof uncheckIcon === 'string'}
			<Icon name={uncheckIcon} />
		{:else}
			{@render uncheckIcon()}
		{/if}
	{/if}

	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.p-contextual-menu__link:focus-visible {
		outline: none;
	}

	.p-contextual-menu__link[aria-checked='false'] {
		padding-left: 32px;
	}
</style>
