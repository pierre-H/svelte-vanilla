<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { BaseFormGroupProps } from './FormGroup.svelte';
	import FormGroup from './FormGroup.svelte';

	export type Props = BaseFormGroupProps<
		HTMLInputAttributes & { groupClass?: string; dense?: boolean }
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
		dense,
		value = $bindable(),
		type = 'text',
		...restProps
	}: Props = $props();
</script>

<FormGroup class={groupClass} {label} {error} {caution} {success} {helpText} for={id} {required}>
	{#snippet children(prop)}
		<input
			{...restProps}
			{name}
			{id}
			{required}
			{type}
			bind:value
			aria-invalid={prop.invalid}
			aria-describedby={prop.describedby}
			class:p-form-validation__input={prop.validation}
			class:is-dense={dense}
		/>
	{/snippet}
</FormGroup>
