<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
		title: string | Snippet;
		message?: string | Snippet;
		color?: 'positive' | 'caution' | 'negative' | 'information';
		borderless?: boolean;
		inline?: boolean;
		timestamp?: string | Snippet;
		actions?: Snippet;
		dismissible?: boolean;
		closeLabel?: string;
		onclose?: (event: Event) => void;
	};
</script>

<script lang="ts">
	let {
		class: notificationClass,
		id,
		title,
		message,
		color = 'information',
		borderless,
		inline,
		timestamp,
		dismissible,
		actions: notificationActions,
		closeLabel = 'Close',
		onclose,
		children,
		...restProps
	}: Props = $props();
</script>

<div
	class="p-notification--{color} {notificationClass ?? ''}"
	class:is-borderless={borderless}
	class:is-inline={inline}
	role="alert"
	{id}
	{...restProps}
>
	<div class="p-notification__content">
		<h5 class="p-notification__title">
			{#if typeof title === 'string'}
				{title}
			{:else}
				{@render title()}
			{/if}
		</h5>
		{#if message}
			<p class="p-notification__message">
				{#if typeof message === 'string'}
					{title}
				{:else}
					{@render message()}
				{/if}
			</p>
		{/if}
		{#if children}
			{@render children()}
		{/if}
		{#if dismissible}
			<button class="p-notification__close" aria-controls={id} onclick={onclose}
				>{closeLabel}</button
			>
		{/if}
	</div>
	{#if timestamp || notificationActions}
		<div class="p-notification__meta">
			{#if timestamp}
				<span class="p-notification__timestamp">
					{#if typeof timestamp === 'string'}
						{timestamp}
					{:else}
						{@render timestamp()}
					{/if}
				</span>
			{/if}
			{#if notificationActions}
				<div class="p-notification__actions">
					{@render notificationActions()}
				</div>
			{/if}
		</div>
	{/if}
</div>
