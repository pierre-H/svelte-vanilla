<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLElement> & {
		previous: string | Snippet<[]>;
		previousLabel?: string | Snippet<[]>;
		previousHref: HTMLAnchorAttributes['href'];
		previousTarget?: HTMLAnchorAttributes['target'];

		next: string | Snippet<[]>;
		nextLabel?: string | Snippet<[]>;
		nextHref: HTMLAnchorAttributes['href'];
		nextTarget?: HTMLAnchorAttributes['target'];
	};
</script>

<script lang="ts">
	let {
		class: paginationClass,
		previous,
		previousLabel = 'Previous',
		previousHref,
		previousTarget,
		next,
		nextLabel = 'Next',
		nextHref,
		nextTarget,
		...restProps
	}: Props = $props();
</script>

<footer class="p-article-pagination {paginationClass ?? ''}" {...restProps}>
	<a class="p-article-pagination__link--previous" href={previousHref} target={previousTarget}>
		<span class="p-article-pagination__label">
			{#if typeof previousLabel === 'string'}
				{previousLabel}
			{:else}
				{@render previousLabel()}
			{/if}
		</span>
		<span class="p-article-pagination__title">
			{#if typeof previous === 'string'}
				{previous}
			{:else}
				{@render previous()}
			{/if}
		</span>
	</a>
	<a class="p-article-pagination__link--next" href={nextHref} target={nextTarget}>
		<span class="p-article-pagination__label">
			{#if typeof nextLabel === 'string'}
				{nextLabel}
			{:else}
				{@render nextLabel()}
			{/if}
		</span>
		<span class="p-article-pagination__title">
			{#if typeof next === 'string'}
				{next}
			{:else}
				{@render next()}
			{/if}
		</span>
	</a>
</footer>
