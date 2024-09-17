<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { BaseFormGroupProps } from './FormGroup.svelte';
	import FormGroup from './FormGroup.svelte';

	export interface ComboboxItem<I extends { [key: string]: string }>
		extends ComboboxOptionProps<string> {
		infos?: I;
		items?: undefined;
	}
	export interface ComboboxItemGroup<I extends { [key: string]: string }> {
		label: string;
		key: string;
		items: ComboboxItem<I>[];
	}

	export interface Props<I extends { [key: string]: string }, M extends boolean>
		extends Omit<
			BaseFormGroupProps<
				HTMLInputAttributes &
					Omit<
						CreateComboboxProps<string>,
						'selected' | 'defaultSelected' | 'open' | 'multiple'
					> & {}
			>,
			'children'
		> {
		children?: Snippet<[ComboboxItem<I>]>;
		defaultSelected?: ComboboxSelected<M, string>;
		multiple?: M | boolean;
		selected?: ComboboxSelected<M, string>;
		open?: boolean;
		groupClass?: string;
		dense?: boolean;
		items: Array<ComboboxItem<I> | ComboboxItemGroup<I>>;
		noResult?: string | Snippet;
	}

	function normalizeText(text: string): string {
		return text
			.trim()
			.toLocaleLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
	}
</script>

<script lang="ts" generics="I extends { [key: string]: string }, M extends boolean">
	import {
		createCombobox,
		createSync,
		melt,
		type ComboboxOptionProps,
		type ComboboxSelected,
		type CreateComboboxProps
	} from '@melt-ui/svelte';
	import Icon from '$lib/Icon/Icon.svelte';
	import { fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import Chip from '$lib/Chip/Chip.svelte';

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
		children: itemChildren,
		dense,
		items,
		noResult = 'No results found',
		defaultSelected,
		selected = $bindable(),
		onSelectedChange,
		multiple = false,
		defaultOpen,
		open = $bindable(defaultOpen),
		onOpenChange,
		scrollAlignment,
		loop,
		closeOnOutsideClick = true,
		escapeBehavior,
		preventScroll,
		preventTextSelectionOverflow,
		portal = 'body',
		positioning = {
			placement: 'bottom-start',
			sameWidth: true
		},
		forceVisible = true,
		highlightOnHover,
		ids,
		...restProps
	}: Props<I, M> = $props();

	const {
		elements: { menu, input, option, group, groupLabel },
		states: { inputValue, touchedInput, highlighted, highlightedItem, ...states },
		helpers: { isSelected }
	} = createCombobox<string, M>({
		defaultSelected,
		//@ts-ignore
		onSelectedChange,
		//@ts-ignore
		multiple,
		defaultOpen,
		onOpenChange,
		scrollAlignment,
		loop,
		closeOnOutsideClick,
		escapeBehavior,
		preventScroll,
		preventTextSelectionOverflow,
		portal,
		positioning,
		forceVisible,
		highlightOnHover,
		ids
	});

	const sync = createSync(states);

	$effect(() => {
		sync.open(value, (o) => (open = o));
	});

	$effect(() => {
		//@ts-ignore
		sync.selected(selected, (s) => (selected = s));
	});

	$effect(() => {
		if (!open && !Array.isArray(selected)) {
			$inputValue = selected?.label ?? '';
		}
	});

	function filterItems(
		item: ComboboxItem<I> | ComboboxItemGroup<I>
	): ComboboxItem<I> | ComboboxItemGroup<I> | null {
		const normalizedInput = normalizeText($inputValue);

		if (item.items) {
			if (item.label && normalizeText(item.label).includes(normalizedInput)) {
				return item;
			}

			const filteredChildren = item.items.map(filterItems).filter((item) => !!item);

			if (filteredChildren.length) {
				return {
					...item,
					items: filteredChildren as ComboboxItem<I>[]
				};
			}
			return null;
		}

		const { label, infos, value } = item;

		if (normalizeText(value).includes(normalizedInput)) {
			return item;
		}

		if (label && normalizeText(label).includes(normalizedInput)) {
			return item;
		}

		if (infos) {
			for (const info of Object.values(infos)) {
				if (normalizeText(info).includes(normalizedInput)) {
					return item;
				}
			}
		}

		return null;
	}

	let filteredItems = $derived(
		$inputValue && $touchedInput ? items.map(filterItems).filter((item) => !!item) : items
	);

	function clearAll() {
		if (multiple) {
			selected = [] as any;
		}
	}

	function onChange(item: ComboboxItem<I>, checked: boolean) {
		if (multiple) {
			if (!Array.isArray(selected)) {
				//@ts-ignore
				selected = [];
			}

			const itemAlreadySelected = selected.some(({ value }) => value === item.value);

			if (checked && !itemAlreadySelected) {
				//@ts-ignore
				selected = [...selected, item];
			} else if (!checked && itemAlreadySelected) {
				//@ts-ignore
				selected = selected.filter(({ value }) => value !== item.value);
			}
		} else {
			//@ts-ignore
			selected = checked ? item : undefined;
		}
	}

	let multipleIndicatorWidth = $state<number>(0);
	let inputPaddingLeft = $derived(
		multiple && Array.isArray(selected) && selected.length ? multipleIndicatorWidth : 0
	);

	let allComboboxItems = $derived(
		items
			.map((item) => {
				if (item.items) {
					return item.items;
				}
				return item;
			})
			.flat()
	);
</script>

{#snippet renderComboboxItem(item: ComboboxItem<I>)}
	{@const opts = $option(item)}
	<li use:melt={opts} class="p-contextual-menu__link">
		<input
			type="checkbox"
			aria-labelledby="{name}-{item.value}"
			class="p-checkbox__input"
			checked={$isSelected(item.value)}
			disabled={item.disabled}
		/>
		<div class="p-combobox-label p-checkbox__label" id="{name}-{item.value}">
			{#if itemChildren}
				{@render itemChildren(item)}
			{:else}
				{item.label}
			{/if}
		</div>
	</li>
{/snippet}

<FormGroup class={groupClass} {label} {error} {caution} {success} {helpText} for={id} {required}>
	{#snippet children(prop)}
		<div class="p-combobox" style="--p-combobox-padding-left: {inputPaddingLeft}px">
			{#if multiple && Array.isArray(selected) && selected.length}
				<div class="p-combobox-multiple-indicator" bind:clientWidth={multipleIndicatorWidth}>
					<Chip dismiss inline ondismiss={clearAll}>
						{selected.length}
					</Chip>
				</div>
			{/if}
			<input
				use:melt={$input}
				{...restProps}
				{id}
				{required}
				type="text"
				aria-invalid={prop.invalid}
				aria-describedby={prop.describedby}
				class:p-form-validation__input={prop.validation}
				class:is-dense={dense}
			/>
			<div class="p-combobox-icon">
				<Icon name="chevron-{open ? 'up' : 'down'}" />
			</div>
		</div>
		{#each allComboboxItems as item (item.value)}
			<input
				type="checkbox"
				class="u-hide"
				checked={$isSelected(item.value)}
				{name}
				value={item.value}
				disabled={item.disabled}
				onchange={({ currentTarget: { checked } }) => onChange(item, checked)}
			/>
		{/each}
	{/snippet}
</FormGroup>

{#if open}
	<ul
		class=" p-contextual-menu__dropdown p-combobox-menu"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
		aria-hidden={!open}
	>
		{#each filteredItems as item, itemIndex (itemIndex)}
			{#if item.items}
				<div class="p-contextual-menu__group" use:melt={$group(item.key)}>
					<strong class="p-contextual-menu__link" use:melt={$groupLabel(item.key)}>
						{item.label}
					</strong>
					{#each item.items as child (child.value)}
						{@render renderComboboxItem(child)}
					{/each}
				</div>
			{:else}
				{@render renderComboboxItem(item)}
			{/if}
		{:else}
			<div class="p-contextual-menu__group">
				<li class="p-contextual-menu__link">
					{#if typeof noResult === 'string'}
						{noResult}
					{:else if noResult}
						{@render noResult()}
					{:else}
						No results found
					{/if}
				</li>
			</div>
		{/each}
	</ul>
{/if}

<style>
	.p-combobox {
		position: relative;
		display: block;
	}

	.p-combobox > input {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-combobox-icon,
	.p-combobox-multiple-indicator {
		position: absolute;
		top: 50%;
		z-index: 10;
		transform: translateY(-50%);
	}

	.p-combobox-icon {
		right: 0.5rem;
	}

	.p-combobox-multiple-indicator {
		left: 0.5rem;
	}

	.p-combobox-menu {
		max-height: 300px;
		max-width: 100% !important;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.p-contextual-menu__link:has(input) {
		position: relative;
		display: flex;
		gap: 0.5rem;
		align-items: flex-start;
	}

	.p-contextual-menu__link:has(input:not(:disabled)) {
		cursor: pointer;
	}

	.p-contextual-menu__link:has(input:disabled) {
		cursor: not-allowed;
	}

	:global(.p-combobox-menu .p-contextual-menu__link[data-highlighted]) {
		background-color: var(--vf-color-background-hover);
		text-decoration: none;
	}

	.p-combobox-menu .p-checkbox__label::before,
	.p-combobox-menu .p-checkbox__label::after {
		margin-top: 5px;
	}

	strong.p-contextual-menu__link:hover {
		background: none;
	}

	input {
		padding-left: calc(18px + var(--p-combobox-padding-left));
	}
</style>
