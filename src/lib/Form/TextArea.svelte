<script lang="ts" context="module">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { BaseFormGroupProps } from './FormGroup.svelte';
	import FormGroup from './FormGroup.svelte';

	export type Props = BaseFormGroupProps<
		HTMLTextareaAttributes & { groupClass: string; dense?: boolean }
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
		value = $bindable(),
		dense,
		...restProps
	}: Props = $props();
</script>

<FormGroup class={groupClass} {label} {error} {caution} {success} {helpText} {name} {id} {required}>
	{#snippet children(prop)}
		<textarea
			{...restProps}
			{name}
			{id}
			{required}
			aria-invalid={prop.invalid}
			aria-describedby={prop.describedby}
			class:p-form-validation__input={prop.validation}
			bind:value
			class:is-dense={dense}
		>
		</textarea>
	{/snippet}
</FormGroup>
