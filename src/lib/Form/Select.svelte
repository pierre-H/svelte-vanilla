<script lang="ts" module>
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import type { BaseFormGroupProps } from './FormGroup.svelte';
	import FormGroup from './FormGroup.svelte';

	export type Props = BaseFormGroupProps<
		HTMLSelectAttributes & { groupClass?: string; dense?: boolean }
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
		id = name,
		required,
		value = $bindable(),
		children: selectChildren,
		dense,
		...restProps
	}: Props = $props();
</script>

<FormGroup class={groupClass} {label} {error} {caution} {success} {helpText} for={id} {required}>
	{#snippet children(prop)}
		<select
			{...restProps}
			{name}
			{id}
			{required}
			aria-invalid={prop.invalid}
			aria-describedby={prop.describedby}
			class:p-form-validation__input={prop.validation}
			class:is-dense={dense}
			bind:value
		>
			{#if selectChildren}
				{@render selectChildren()}
			{/if}
		</select>
	{/snippet}
</FormGroup>
