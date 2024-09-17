<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { BaseFormGroupProps } from './FormGroup.svelte.js';

	export type Props = BaseFormGroupProps<
		Omit<HTMLInputAttributes, 'type' | 'value' | 'required'> &
			Omit<CreateTagsInputProps, 'tags'> & {
				groupClass?: string;
				dense?: boolean;
				tags?: Tag[];
			}
	>;
</script>

<script lang="ts">
	import Chip from '$lib/Chip/Chip.svelte';
	import {
		createSync,
		createTagsInput,
		melt,
		type CreateTagsInputProps,
		type Tag
	} from '@melt-ui/svelte';
	import FormGroup from './FormGroup.svelte';
	import { uniqueId } from '$lib/utils/uniqueId.js';

	let {
		groupClass,
		class: inputClass,
		label,
		error,
		caution,
		success,
		helpText,
		required,
		dense,
		name,
		disabled,
		placeholder,
		editable,
		unique,
		trim,
		blur,
		addOnPaste,
		maxTags,
		allowed,
		add,
		remove,
		update,
		defaultTags,
		tags = $bindable([]),
		onTagsChange,
		id = name ?? uniqueId('tags-input-'),
		...restProps
	}: Props = $props();

	const {
		elements: { root, input, tag, edit },
		states,
		helpers: { removeTag }
	} = createTagsInput({
		disabled,
		placeholder,
		editable,
		unique,
		trim,
		blur,
		addOnPaste,
		maxTags,
		allowed,
		add,
		remove,
		update,
		defaultTags,
		onTagsChange
	});

	const sync = createSync({ tags: states.tags });

	$effect(() => {
		sync.tags(tags, (t) => (tags = t));
	});

	let inputWidth = $state<number>(0);

	let tagsWidth = $state<number>(0);
	let tagsHeight = $state<number>(0);
	let tagsWrapped = $derived(tagsHeight > 52 || inputWidth - tagsWidth < 100);

	function onHiddenInputChange({ currentTarget: { value } }: { currentTarget: HTMLInputElement }) {
		tags = value
			.split(',')
			.map((v) => ({
				value: v.trim(),
				id: uniqueId('tag-')
			}))
			.filter((v) => !!v);
	}
</script>

<FormGroup class={groupClass} {label} {error} {caution} {success} {helpText} for={id} {required}>
	{#snippet children(prop)}
		<div
			class="p-tag-input"
			use:melt={$root}
			style="--p-tag-input__tags-width: {tagsWidth}px;--p-tag-input__tags-height: {tagsHeight}px"
			bind:clientWidth={inputWidth}
		>
			<div class="p-tag-input__tags" bind:clientWidth={tagsWidth} bind:clientHeight={tagsHeight}>
				{#each tags as t}
					<div use:melt={$tag(t)}>
						<Chip dismiss ondismiss={() => removeTag(t)} class="u-no-margin">
							{t.value}
						</Chip>
					</div>
					<div use:melt={$edit(t)} class="p-chip--information u-no-margin"></div>
				{/each}
			</div>
			<input
				{...restProps}
				{id}
				type="text"
				aria-invalid={prop.invalid}
				aria-describedby={prop.describedby}
				class:p-form-validation__input={prop.validation}
				class:is-dense={dense}
				class:tags-wrapped={tagsWrapped}
				use:melt={$input}
			/>
		</div>
		{#if name}
			<input type="hidden" {name} value={tags.join(',')} onchange={onHiddenInputChange} />
		{/if}
	{/snippet}
</FormGroup>

<style>
	.p-tag-input {
		position: relative;
	}

	.p-tag-input__tags {
		position: absolute;
		top: 0px;
		left: 8px;
		max-width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.p-tag-input__tags .p-chip--information {
		min-height: 20px;
		overflow: hidden;
	}

	:global(.p-tag-input__tags [data-melt-tags-input-tag][data-selected] > *) {
		background-color: var(--vf-color-background-neutral-active);
		border-color: var(--vf-color-border-neutral);
	}

	input:not(.tags-wrapped) {
		padding-left: calc(var(--p-tag-input__tags-width) + 16px);
	}

	input.tags-wrapped {
		padding-top: calc(var(--p-tag-input__tags-height) + 8px);
	}
</style>
