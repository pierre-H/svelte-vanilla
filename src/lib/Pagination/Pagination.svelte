<script lang="ts" context="module">
	import { createPagination, createSync, melt, type CreatePaginationProps } from '@melt-ui/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLElement> &
		Omit<CreatePaginationProps, 'page'> & {
			label?: string;
			previousLabel?: string;
			nextLabel?: string;
			showLabels?: boolean;
			page?: number;
		};
</script>

<script lang="ts">
	import Icon from '$lib/Icon/Icon.svelte';

	let {
		children,
		label = 'Pagination',
		previousLabel = 'Previous page',
		nextLabel = 'Next page',
		showLabels,
		class: paginationClass,
		count,
		perPage,
		siblingCount,
		defaultPage,
		page = $bindable(defaultPage ?? 1),
		onPageChange,
		...restProps
	}: Props = $props();

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, ...states }
	} = createPagination({
		count,
		perPage,
		defaultPage,
		siblingCount,
		onPageChange
	});

	const sync = createSync({ page: states.page });

	$effect(() => {
		sync.page(page, (e) => (page = e));
	});
</script>

<nav class="p-pagination {paginationClass}" aria-label={label} use:melt={$root} {...restProps}>
	<ol class="p-pagination__items">
		<li class="p-pagination__item">
			<button
				class="p-pagination__link--previous"
				class:is-disabled={$prevButton.disabled}
				title={previousLabel}
				use:melt={$prevButton}
			>
				<Icon name="chevron-down">{previousLabel}</Icon>
				{#if showLabels}
					<span>{previousLabel}</span>
				{/if}
			</button>
		</li>

		{#each $pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<li class="p-pagination__item p-pagination__item--truncation">…</li>
			{:else}
				<li class="p-pagination__item">
					<button class="p-pagination__link" use:melt={$pageTrigger(page)}>{page.value}</button>
				</li>
			{/if}
		{/each}

		<li class="p-pagination__item">
			<button
				class="p-pagination__link--next"
				class:is-disabled={$nextButton.disabled}
				title={nextLabel}
				use:melt={$nextButton}
			>
				{#if showLabels}
					<span>{nextLabel}</span>
				{/if}
				<Icon name="chevron-down">{nextLabel}</Icon>
			</button>
		</li>
	</ol>
</nav>
