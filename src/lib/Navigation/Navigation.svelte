<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLElement> & {
		dark?: boolean;
		sliding?: boolean;
		sticky?: boolean;
		reduced?: boolean;
		secondary?: boolean;
		logo?: Snippet;
		search?: boolean;
		searchLabel?: string | Snippet;
		searchOpen?: boolean;
		menuEnd?: Snippet;
		menuOpen?: boolean;
		menuLabel?: string | Snippet;
		menuCloseLabel?: string | Snippet;
	};
</script>

<script lang="ts">
	import SearchBox from '$lib/SearchBox/SearchBox.svelte';

	let {
		class: navigationClass,
		dark,
		sliding,
		sticky,
		reduced,
		secondary,
		logo,
		search,
		searchLabel = 'Search',
		searchOpen = $bindable<boolean>(false),
		children,
		menuEnd,
		menuOpen = $bindable<boolean>(false),
		menuLabel = 'Menu',
		menuCloseLabel = 'Close',
		...restProps
	}: Props = $props();

	function menuToggle() {
		menuOpen = !menuOpen;
	}

	function searchToggle() {
		searchOpen = !searchOpen;
	}

	let searchElm = $state<HTMLDivElement>();

	$effect(() => {
		if (searchElm && searchOpen) {
			searchElm.querySelector('input')?.focus();
		}
	});

	function onKeyDownSearch(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			searchOpen = false;
		}
	}
</script>

<header
	class="p-navigation {navigationClass ?? ''}"
	class:is-dark={dark}
	class:p-navigation--sliding={sliding}
	class:is-sticky={sticky}
	class:p-navigation--reduced={reduced}
	class:is-secondary={secondary}
	class:has-menu-open={menuOpen}
	class:has-search-open={searchOpen}
	{...restProps}
>
	<div class="p-navigation__row--25-75">
		<div class="p-navigation__banner">
			{#if logo}
				<div class="p-navigation__tagged-logo">
					{@render logo()}
				</div>
			{/if}
			<ul class="p-navigation__items">
				{#if search}
					<li class="p-navigation__item">
						<button class="p-navigation__link--search-toggle" type="button" onclick={searchToggle}>
							<span class="p-navigation__search-label">
								{#if typeof searchLabel === 'string'}
									{searchLabel}
								{:else}
									{@render searchLabel()}
								{/if}
							</span>
						</button>
					</li>
				{/if}
				<li class="p-navigation__item">
					<button class="p-navigation__link" type="button" onclick={menuToggle}>
						{#if menuOpen}
							{#if typeof menuCloseLabel === 'string'}
								{menuCloseLabel}
							{:else}
								{@render menuCloseLabel()}
							{/if}
						{:else if typeof menuLabel === 'string'}
							{menuLabel}
						{:else}
							{@render menuLabel()}
						{/if}
					</button>
				</li>
			</ul>
		</div>
		<nav class="p-navigation__nav" aria-label="Example main">
			<ul class="p-navigation__items">
				{#if children}
					{@render children()}
				{/if}
			</ul>
			<ul class="p-navigation__items">
				{#if menuEnd}
					{@render menuEnd()}
				{:else if search && !secondary}
					<li class="p-navigation__item">
						<button class="p-navigation__link--search-toggle" type="button" onclick={searchToggle}>
							<span class="p-navigation__search-label">
								{#if typeof searchLabel === 'string'}
									{searchLabel}
								{:else}
									{@render searchLabel()}
								{/if}
							</span>
						</button>
					</li>
				{/if}
			</ul>
			{#if search && !reduced}
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<div
					class="p-navigation__search"
					bind:this={searchElm}
					onkeydown={onKeyDownSearch}
					role="search"
				>
					<SearchBox />
				</div>
			{/if}
		</nav>
	</div>
	{#if search}
		<div
			class="p-navigation__search-overlay"
			onclick={searchToggle}
			onkeypress={searchToggle}
			role="none"
		></div>
	{/if}
</header>
