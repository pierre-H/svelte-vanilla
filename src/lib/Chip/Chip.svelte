<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type Props = HTMLButtonAttributes & {
		lead?: Snippet | string;
		color?: 'positive' | 'caution' | 'negative' | 'information';
		dismiss?: boolean;
		dismissLabel?: string;
		ondismiss?: HTMLButtonAttributes['onclick'];
		dense?: boolean;
		inline?: boolean;
	};
</script>

<script lang="ts">
	let {
		children,
		class: chipClass,
		lead,
		color,
		dismiss,
		dismissLabel = 'Dismiss',
		ondismiss,
		dense,
		inline,
		...restProps
	}: Props = $props();

	let spaceAfterLead = $derived.by(() => {
		if (typeof navigator === 'undefined') {
			return false;
		}
		return navigator.languages.some((language) => language === 'fr' || language.startsWith('fr-'));
	});

	let chipType = $derived(dismiss ? 'span' : 'button');
</script>

<svelte:element
	this={chipType}
	class="p-chip{color ? `--${color}` : ''} {chipClass}"
	class:is-dense={dense}
	class:is-inline={inline}
	{...restProps}
>
	{#if lead}
		<span class="p-chip__lead">
			{#if typeof lead === 'string'}
				{lead}
			{:else}
				{@render lead()}
			{/if}
		</span>
	{/if}
	{#if children}
		<span class="p-chip__value" class:p-chip__space-before={spaceAfterLead}>
			{@render children()}
		</span>
	{/if}
	{#if dismiss}
		<button class="p-chip__dismiss" type="button" title={dismissLabel} onclick={ondismiss}
			>{dismissLabel}</button
		>
	{/if}
</svelte:element>

<style>
	.p-chip__space-before {
		margin-left: 2px;
	}
</style>
