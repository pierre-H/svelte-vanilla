<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import { uniqueId } from '../utils/uniqueId.js';
	import type { Snippet } from 'svelte';

	export type BaseFormGroupProps<T> = Omit<T, 'children'> & {
		for?: string | null;
		label: string | Snippet;
		labelGroup?: Snippet<
			[
				{
					class?: string;
					label: BaseFormGroupProps<T>['label'];
					for: BaseFormGroupProps<T>['for'];
				}
			]
		>;
		required?: boolean;
		helpText?: string | Snippet;
		error?: boolean | null | string | Snippet;
		caution?: boolean | null | string | Snippet;
		success?: boolean | null | string | Snippet;
		children?: Snippet;
	};

	export type Props = Omit<BaseFormGroupProps<HTMLAttributes<HTMLDivElement>>, 'children'> & {
		children: Snippet<
			[
				{
					describedby: string | null;
					invalid: boolean;
					required: boolean | undefined;
					validation: boolean;
				}
			]
		>;
	};
</script>

<script lang="ts">
	import { createLabel, melt } from '@melt-ui/svelte';

	const {
		elements: { root }
	} = createLabel();

	let {
		children,
		class: groupClass,
		label,
		labelGroup,
		error,
		caution,
		success,
		helpText,
		for: forName,
		required,
		...restProps
	}: Props = $props();

	let describedby = $state<string | null>(null);
	let invalid = $state<boolean>(false);

	let isError = $derived(!!error);
	let isCaution = $derived(!isError && !!caution);
	let isSuccess = $derived(!isError && !isCaution && !!success);
	let isHelpText = $derived(!isError && !isCaution && !isSuccess && !!helpText);

	let message = $derived.by(() => {
		if (isError) return error;
		if (isCaution) return caution;
		if (isSuccess) return success;
		if (helpText) return helpText;

		return undefined;
	});

	let hasMessage = $derived(!!message);

	let messageId = $derived(`${forName ?? uniqueId('form-group-')}-message`);

	$effect(() => {
		describedby = hasMessage ? messageId : null;
		invalid = isError;
	});

	let childrenProps = $derived({
		describedby,
		invalid,
		required,
		validation: isError || isCaution || isSuccess
	});
</script>

<div
	class="p-form-validation {groupClass ?? ''}"
	class:is-error={isError}
	class:is-caution={isCaution}
	class:is-success={isSuccess}
	{...restProps}
>
	{#if labelGroup}
		{@render labelGroup({ label, class: required ? 'is-required' : undefined, for: forName })}
	{:else if label}
		<label for={forName} class:is-required={required} use:melt={$root}>
			{#if typeof label === 'string'}
				{label}
			{:else}
				{@render label()}
			{/if}
		</label>
	{/if}
	{#if children}
		{@render children(childrenProps)}
	{/if}
	{#if hasMessage}
		<p
			class:p-form-help-text={isHelpText}
			class:p-form-validation__message={!isHelpText}
			id={messageId}
		>
			{#if typeof message === 'string'}
				{message}
			{:else if typeof message === 'function'}
				{@render message()}
			{/if}
		</p>
	{/if}
</div>
