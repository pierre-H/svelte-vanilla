<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';
	import type { Nullable } from 'vitest';

	export type Props = Omit<HTMLAttributes<HTMLLIElement>, 'title'> &
		Nullable<
			Pick<
				HTMLAnchorAttributes,
				| 'href'
				| 'hreflang'
				| 'target'
				| 'download'
				| 'media'
				| 'ping'
				| 'rel'
				| 'type'
				| 'referrerpolicy'
			>
		> & {
			image: string;
			alt: string;
			title: string | Snippet<[]>;
		};
</script>

<script lang="ts">
	let {
		children,
		class: itemClass,
		image,
		alt,
		title,
		href,
		hreflang,
		target,
		download,
		media,
		ping,
		rel,
		type,
		referrerpolicy,
		...restProps
	}: Props = $props();
</script>

{#snippet matrixTitle()}
	{#if typeof title === 'string'}
		{title}
	{:else}
		{@render title()}
	{/if}
{/snippet}

<li class="p-matrix__item {itemClass ?? ''}" {...restProps}>
	<img class="p-matrix__img" src={image} {alt} />
	<div class="p-matrix__content">
		<h3 class="p-matrix__title">
			{#if href}
				<a
					class="p-matrix__link"
					{href}
					{hreflang}
					{target}
					{download}
					{media}
					{ping}
					{rel}
					{type}
					{referrerpolicy}
				>
					{@render matrixTitle()}
				</a>
			{:else}
				{@render matrixTitle()}
			{/if}
		</h3>
		<div class="p-matrix__desc">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</li>
