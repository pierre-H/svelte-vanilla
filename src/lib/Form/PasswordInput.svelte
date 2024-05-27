<script lang="ts" context="module">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { BaseFormGroupProps } from './FormGroup.svelte';
	import FormGroup from './FormGroup.svelte';
	import { Button } from '$lib/index.js';

	export type Props = BaseFormGroupProps<
		HTMLInputAttributes & {
			groupClass: string;
			dense?: boolean;
			showLabel?: string;
			hideLabel?: string;
		}
	>;
</script>

<script lang="ts">
	let {
		groupClass,
		class: inputClass,
		label,
		error,
		caution,
		success,
		helpText,
		name,
		id,
		required,
		dense,
		showLabel = 'Show',
		hideLabel = 'Hide',
		value = $bindable(),
		...restProps
	}: Props = $props();

	let type = $state<'text' | 'password'>('password');

	function toggleType() {
		type = type === 'text' ? 'password' : 'text';
	}
</script>

<FormGroup class={groupClass} {label} {error} {caution} {success} {helpText} {name} {id} {required}>
	{#snippet children(prop)}
		<input
			{...restProps}
			{type}
			{name}
			{id}
			{required}
			bind:value
			aria-invalid={prop.invalid}
			aria-describedby={prop.describedby}
			class:p-form-validation__input={prop.validation}
			class:is-dense={dense}
		/>
	{/snippet}
	{#snippet labelGroup({ label: finalLabel, ...labelRestProps })}
		<div class="p-form-password-toggle">
			<label {...labelRestProps} for={labelRestProps.for}>
				{#if typeof finalLabel === 'string'}
					{finalLabel}
				{:else}
					{@render finalLabel()}
				{/if}
			</label>
			<Button
				kind="base"
				class="u-no-margin--bottom"
				icon={type === 'text' ? 'hide' : 'show'}
				iconPosition="right"
				aria-live="polite"
				aria-controls={id}
				onclick={toggleType}
			>
				{type === 'text' ? hideLabel : showLabel}
			</Button>
		</div>
	{/snippet}
</FormGroup>
