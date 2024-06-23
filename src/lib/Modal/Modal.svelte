<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> &
		Omit<CreateDialogProps, 'open'> & {
			open: boolean;
			header?: string | Snippet;
			children?: Snippet;
			footer?: Snippet;
		};
</script>

<script lang="ts">
	import { createDialog, createSync, melt, type CreateDialogProps } from '@melt-ui/svelte';

	let {
		header,
		children,
		footer,
		role,
		preventScroll,
		escapeBehavior,
		closeOnOutsideClick = true,
		portal,
		forceVisible,
		openFocus,
		closeFocus,
		defaultOpen,
		open = $bindable(defaultOpen),
		onOpenChange,
		ids,
		...restProps
	}: Props = $props();

	const {
		elements: { portalled, content, title, description, close, overlay },
		states
	} = createDialog({
		role,
		preventScroll,
		closeOnOutsideClick,
		portal,
		forceVisible,
		openFocus,
		closeFocus,
		onOpenChange,
		ids
	});

	const sync = createSync(states);

	$effect(() => {
		sync.open(open, (v) => (open = v));
	});
</script>

{#if open}
	<div class="p-modal" {...restProps} use:melt={$portalled}>
		<div class="p-modal__overlay" use:melt={$overlay}></div>
		<section class="p-modal__dialog" use:melt={$content}>
			{#if header}
				<header class="p-modal__header">
					<h2 class="p-modal__title" use:melt={$title}>
						{#if typeof header === 'string'}
							{header}
						{:else}
							{@render header()}
						{/if}
					</h2>
					<button
						class="p-modal__close"
						use:melt={$close}
						aria-label="Close active modal"
						aria-controls="modal">Close</button
					>
				</header>
			{/if}
			<div use:melt={$description}>
				{#if children}
					{@render children()}
				{/if}
			</div>
			{#if footer}
				<footer class="p-modal__footer">
					{@render footer()}
				</footer>
			{/if}
		</section>
	</div>
{/if}

<style>
	.p-modal__overlay {
		position: fixed;
		inset: 0px;
	}

	:global(.p-modal__footer > button) {
		margin-bottom: 0px;
	}
</style>
