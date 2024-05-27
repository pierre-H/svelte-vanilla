<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	import { uniqueId } from '../utils/uniqueId.js';
	import type { Snippet } from 'svelte';

	export type BaseFormGroupProps<T> = T & {
		name?: string;
		label: string | Snippet;
		labelGroup?: Snippet<
			[
				{
					class?: string;
					label: BaseFormGroupProps<T>['label'];
					for: BaseFormGroupProps<T>['name'];
				}
			]
		>;
		required?: boolean;
		helpText?: string | Snippet;
		error?: boolean | null | string | Snippet;
		caution?: boolean | null | string | Snippet;
		success?: boolean | null | string | Snippet;
	};

	export type Props = BaseFormGroupProps<
		HTMLAttributes<HTMLDivElement> & {
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
		}
	>;
</script>

<script lang="ts">
	let {
		children,
		class: groupClass,
		label,
		labelGroup,
		error,
		caution,
		success,
		helpText,
		name,
		id,
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

	let messageId = $derived(`${id ?? uniqueId('input-')}-message`);

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
		{@render labelGroup({ label, class: required ? 'is-required' : undefined, for: name })}
	{:else if label}
		<label for={name} class:is-required={required}>
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
