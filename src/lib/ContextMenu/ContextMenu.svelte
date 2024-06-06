<script lang="ts" context="module">
	import { createContextMenu, melt } from '@melt-ui/svelte';
	import { setContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLSpanElement> & {
		position?: 'left' | 'center';
		trigger: string | Snippet;
	};
</script>

<script lang="ts">
	let { children, position, trigger, ...restProps }: Props = $props();

	const {
		elements: { trigger: triggerElm, menu, item },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states: { open }
	} = createContextMenu({
		forceVisible: true
	});

	setContext('CONTEXT_MENU', {
		createSubmenu,
		createMenuRadioGroup,
		createCheckboxItem,
		item
	});
</script>

<span
	class:p-contextual-menu={!position}
	class:p-contextual-menu--left={position === 'left'}
	class:p-contextual-menu--center={position === 'center'}
>
	<span use:melt={$triggerElm} {...restProps}>
		{#if typeof trigger === 'string'}
			{trigger}
		{:else}
			{@render trigger()}
		{/if}
	</span>
	<span class="p-contextual-menu__dropdown" use:melt={$menu} aria-hidden={!$open}>
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
