<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLBlockquoteAttributes } from 'svelte/elements';

	export type Props = HTMLBlockquoteAttributes & {
		citation: string | Snippet;
		children: Snippet;
		size?: 'small' | 'large';
		image?: string;
		imageAlt?: string;
	};
</script>

<script lang="ts">
	let {
		class: quoteClass,
		size,
		citation,
		children,
		image,
		imageAlt,
		...restProps
	}: Props = $props();
</script>

<blockquote class="p-pull-quote{size ? `--${size}` : ''} {quoteClass ?? ''}" {...restProps}>
	{#if image}
		<img class="p-pull-quote__image" src={image} alt={imageAlt ?? ''} />
	{/if}
	<p class="p-pull-quote__quote">
		{@render children()}
	</p>
	<span class="p-pull-quote__citation">
		{#if typeof citation === 'string'}
			{citation}
		{:else}
			{@render citation()}
		{/if}
	</span>
</blockquote>
