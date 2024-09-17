<script lang="ts" module>
	import type { Action } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { useActions, type ActionArray } from 'svelte-component-actions';

	export type Props = HTMLButtonAttributes & {
		kind?: 'base' | 'positive' | 'negative' | 'link';
		inline?: boolean;
		dense?: boolean;
		small?: boolean;
		icon?: Snippet | string;
		iconPosition?: 'left' | 'right';
		processing?: boolean;
		use?: ActionArray;
	};
</script>

<script lang="ts">
	let {
		class: buttonClass,
		type,
		children,
		kind,
		inline,
		dense,
		small,
		icon,
		iconPosition = 'left',
		processing,
		disabled,
		use = [],
		...restProps
	}: Props = $props();
</script>

{#snippet iconSnippet()}
	{#if processing}
		<i class="p-icon--spinner u-animation--spin is-light"></i>
	{:else if icon}
		{#if typeof icon === 'string'}
			<i class="p-icon--{icon}"></i>
		{:else}
			{@render icon()}
		{/if}
	{/if}
{/snippet}

<button
	class:p-button={!kind}
	class:p-button--base={kind === 'base'}
	class:p-button--positive={kind === 'positive'}
	class:p-button--negative={kind === 'negative'}
	class:p-button--link={kind === 'link'}
	class:is-inline={inline}
	class:is-dense={dense}
	class:is-small={small}
	class:has-icon={!!icon}
	class:is-processing={processing}
	class={buttonClass}
	disabled={disabled || processing}
	type={type ?? 'button'}
	use:useActions={use}
	{...restProps}
>
	{#if iconPosition === 'left'}
		{@render iconSnippet()}
	{/if}
	{#if children}
		{#if processing || icon}
			<span>
				{@render children()}
			</span>
		{:else}
			{@render children()}
		{/if}
	{/if}
	{#if iconPosition === 'right'}
		{@render iconSnippet()}
	{/if}
</button>
