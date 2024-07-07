<script lang="ts" context="module">
	import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';

	export type Props = BaseFormGroupProps<
		HTMLAttributes<HTMLDivElement> &
			Omit<CreatePinInputProps, 'value'> & {
				groupClass?: string;
				length?: number;
				inputmode?: HTMLInputAttributes['inputmode'];
				value?: string[];
			}
	>;
</script>

<script lang="ts">
	import { createPinInput, createSync, melt, type CreatePinInputProps } from '@melt-ui/svelte';
	import type { BaseFormGroupProps } from './FormGroup.svelte';
	import FormGroup from './FormGroup.svelte';

	let {
		length = 6,
		inputmode,
		defaultValue = [],
		placeholder = '○',
		name,
		disabled,
		type = 'text',
		onValueChange,
		ids,
		value = $bindable(defaultValue),
		groupClass,
		label,
		error,
		caution,
		success,
		helpText,
		required,
		id,
		...restProps
	}: Props = $props();

	const {
		elements: { root, input, hiddenInput },
		states: { valueStr, ...states }
	} = createPinInput({
		defaultValue,
		placeholder,
		name,
		disabled,
		type,
		onValueChange,
		ids
	});

	const sync = createSync(states);

	$effect(() => {
		sync.value(value, (v) => (value = v));
	});
</script>

<FormGroup class={groupClass} {label} {error} {caution} {success} {helpText} for={id} {required}>
	{#snippet children(prop)}
		<div use:melt={$root} {...restProps} {id}>
			{#each Array.from({ length }) as _}
				<input
					use:melt={$input()}
					{inputmode}
					aria-invalid={prop.invalid}
					aria-describedby={prop.describedby}
					class:p-form-validation__input={prop.validation}
				/>
			{/each}
			<input type="hidden" use:melt={$hiddenInput} />
		</div>
	{/snippet}
</FormGroup>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	input {
		max-width: 40px;
		width: 40px;
		min-width: 40px;
		text-align: center;
	}
</style>
