<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
		children: Snippet<
			[
				{
					toggleAside: () => void;
				}
			]
		>;
		navigationBar: Snippet;
		menu?: string | Snippet;
		menuPosition?: 'left' | 'right';
		drawer: Snippet<
			[
				{
					pinned: boolean;
					togglePinned: () => void;
					close: () => void;
				}
			]
		>;
		drawerOpen?: boolean;
		drawerPinned?: boolean;
		aside: Snippet<
			[
				{
					pinned: boolean;
					togglePinned: () => void;
					close: () => void;
					setWidth: (width: 'narrow' | 'default' | 'wide') => void;
				}
			]
		>;
		asideOpen?: boolean;
		asidePinned?: boolean;
		asideWidth?: 'narrow' | 'default' | 'wide';
		status?: Snippet;
	};
</script>

<script lang="ts">
	let {
		class: layoutClass,
		navigationBar,
		menu = 'Menu',
		menuPosition = 'right',
		children,
		drawer,
		drawerOpen = $bindable(false),
		drawerPinned = $bindable(false),
		aside,
		asideOpen = $bindable(false),
		asidePinned = $bindable(false),
		asideWidth = $bindable(),
		status,
		...restProps
	}: Props = $props();

	function toggleDrawerOpen() {
		drawerOpen = !drawerOpen;
	}

	let drawerProps = $derived({
		pinned: drawerPinned,
		togglePinned: () => {
			drawerPinned = !drawerPinned;
		},
		close: toggleDrawerOpen
	});

	let drawerClosed = $derived(!drawerOpen);

	function toggleAsideOpen() {
		asideOpen = !asideOpen;
	}
	let asideClosed = $derived(!asideOpen);

	let asideProps = $derived({
		pinned: asidePinned,
		togglePinned: () => {
			asidePinned = !asidePinned;
		},
		close: toggleAsideOpen,
		setWidth: (width: 'narrow' | 'default' | 'wide') => {
			asideWidth = width;
		}
	});
</script>

<div class="l-application {layoutClass ?? ''}" role="presentation" {...restProps}>
	<div class="l-navigation-bar">
		<div class="u-clearfix">
			{@render navigationBar()}
			<button
				class="u-float-{menuPosition} is-dense u-no-margin"
				type="button"
				onclick={toggleDrawerOpen}
			>
				{#if typeof menu === 'string'}
					{menu}
				{:else}
					{@render menu()}
				{/if}
			</button>
		</div>
	</div>

	<header class="l-navigation" class:is-collapsed={drawerClosed} class:is-pinned={drawerPinned}>
		<div class="l-navigation__drawer">
			{@render drawer(drawerProps)}
		</div>
	</header>

	<main class="l-main">
		{@render children({ toggleAside: toggleAsideOpen })}
	</main>

	<aside
		class="l-aside"
		class:is-pinned={asidePinned}
		class:is-collapsed={asideClosed}
		class:is-narrow={asideWidth === 'narrow'}
		class:is-wide={asideWidth === 'wide'}
	>
		{@render aside(asideProps)}
	</aside>

	{#if status}
		<aside class="l-status">
			{@render status()}
		</aside>
	{/if}
</div>
