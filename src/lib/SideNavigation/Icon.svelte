<script lang="ts">
	import Icon from '$lib/Icon/Icon.svelte';
	import type { Props } from '$lib/Icon/Icon.svelte';
	import Status from './Status.svelte';

	let { class: iconClass, ...restProps }: Props = $props();
</script>

<Status>
	<Icon {...restProps} class="p-side-navigation__icon {iconClass ?? ''}" />
</Status>
