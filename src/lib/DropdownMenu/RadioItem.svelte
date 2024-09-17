<script lang="ts" module>
	import { melt, type createDropdownMenu } from '@melt-ui/svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type Props = HTMLButtonAttributes & {
		value: string;
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
		value,
		checkIcon = 'task-outstanding',
		uncheckIcon,
		...restProps
	}: Props = $props();

	const dropdownMenuContext = getContext<{
		radioItem: ReturnType<
			ReturnType<typeof createDropdownMenu>['builders']['createMenuRadioGroup']
		>['elements']['radioItem'];
		isChecked: ReturnType<
			ReturnType<typeof createDropdownMenu>['builders']['createMenuRadioGroup']
		>['helpers']['isChecked'];
	}>('DROPDOWN_MENU_RADIO');

	if (!dropdownMenuContext?.radioItem) {
		throw new Error('DROPDOWN_MENU context not found');
	}

	const { radioItem, isChecked } = dropdownMenuContext;
</script>

<button
	class="p-contextual-menu__link {itemClass ?? ''}"
	{...restProps}
	use:melt={$radioItem({ value })}
>
	{#if $isChecked(value)}
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
	{:else}
		{value}
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
