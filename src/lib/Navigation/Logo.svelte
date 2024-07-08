<script lang="ts" context="module">
	import type { HTMLAnchorAttributes, HTMLImgAttributes } from 'svelte/elements';

	export type Props = HTMLAnchorAttributes & {
		src: HTMLImgAttributes['src'];
		alt: HTMLImgAttributes['alt'];
		title?: string;
	};
</script>

<script lang="ts">
	let { src, alt = '', title = alt ?? '', class: logoClass, ...restProps }: Props = $props();
</script>

<a class="p-navigation__link {logoClass ?? ''}" {...restProps}>
	<div class="p-navigation__logo-tag">
		<img class="p-navigation__logo-icon" {src} {alt} />
	</div>
	<span class="p-navigation__logo-title">
		{title}
	</span>
</a>
