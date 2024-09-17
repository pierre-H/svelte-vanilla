<script lang="ts" module>
	import {
		createDropdownMenu,
		createSync,
		melt,
		type CreateDropdownMenuProps
	} from '@melt-ui/svelte';
	import { setContext, type Snippet } from 'svelte';
	import type { Props as ButtonProps } from '../Button/Button.svelte';

	export type Props = ButtonProps &
		Omit<CreateDropdownMenuProps, 'arrowSize' | 'open'> & {
			position?: 'left' | 'center';
			trigger?: Snippet;
			open?: boolean;
		};
</script>

<script lang="ts">
	import Button from '$lib/Button/Button.svelte';

	let {
		children,
		position,
		trigger,
		forceVisible = true,
		preventScroll,
		escapeBehavior,
		preventTextSelectionOverflow = true,
		portal,
		closeOnOutsideClick = true,
		loop,
		defaultOpen,
		open = $bindable<boolean>(defaultOpen ?? false),
		onOpenChange,
		ids,
		positioning,
		...restProps
	}: Props = $props();

	const {
		elements: { trigger: triggerElm, menu, item },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states
	} = createDropdownMenu({
		forceVisible,
		positioning,
		preventScroll,
		escapeBehavior,
		preventTextSelectionOverflow,
		portal,
		closeOnOutsideClick,
		loop,
		defaultOpen,
		onOpenChange,
		ids
	});

	setContext('DROPDOWN_MENU', {
		createSubmenu,
		createMenuRadioGroup,
		createCheckboxItem,
		item
	});

	const sync = createSync(states);

	$effect(() => {
		sync.open(open, (o) => (open = o));
	});
</script>

<span
	class:p-contextual-menu={!position}
	class:p-contextual-menu--left={position === 'left'}
	class:p-contextual-menu--center={position === 'center'}
>
	<Button {...restProps} {...$triggerElm} use={[$triggerElm.action]} children={trigger} />
	<span class="p-contextual-menu__dropdown" use:melt={$menu} aria-hidden={!open}>
		{#if children}
			{@render children()}
		{/if}
	</span>
</span>

<style>
	.p-contextual-menu__dropdown:focus-visible {
		outline: none;
	}
</style>
