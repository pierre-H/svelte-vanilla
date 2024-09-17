<script lang="ts" module>
	import {
		createSync,
		melt,
		type createDropdownMenu,
		type CreateDropdownMenuRadioGroupProps
	} from '@melt-ui/svelte';
	import { getContext, setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLSpanElement> &
		Omit<CreateDropdownMenuRadioGroupProps, 'value'> & {
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

	const dropdownMenuContext = getContext<{
		createMenuRadioGroup: ReturnType<typeof createDropdownMenu>['builders']['createMenuRadioGroup'];
	}>('DROPDOWN_MENU');

	if (!dropdownMenuContext?.createMenuRadioGroup) {
		throw new Error('DROPDOWN_MENU context not found');
	}

	const { createMenuRadioGroup } = dropdownMenuContext;

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked },
		states
	} = createMenuRadioGroup({
		defaultValue,
		onValueChange
	});

	setContext('DROPDOWN_MENU_RADIO', {
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
