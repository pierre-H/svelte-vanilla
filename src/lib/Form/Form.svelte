<script lang="ts" module>
	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	export type Props = HTMLFormAttributes & {
		children?: Snippet;
		type?: 'inline' | 'stacked';
	};
</script>

<script lang="ts">
	let { children, class: formClass, type, ...restProps }: Props = $props();
</script>

<form
	class="p-form {formClass ?? ''}"
	class:p-form--inline={type === 'inline'}
	class:p-form--stacked={type === 'stacked'}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</form>
