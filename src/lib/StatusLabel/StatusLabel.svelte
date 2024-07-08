<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> & {
		color?: 'positive' | 'caution' | 'negative' | 'information';
	};
</script>

<script lang="ts">
	let { color, class: statusLabelClass, children, ...restProps }: Props = $props();
</script>

<div class="p-status-label{color ? `--${color}` : ''} {statusLabelClass ?? ''}" {...restProps}>
	{#if children}
		: ''
		{@render children()}
	{/if}
</div>
