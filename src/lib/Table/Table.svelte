<script lang="ts" context="module">
	import type { HTMLTableAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	export type Props<T> = HTMLTableAttributes & {
		data: T[];
		columns: ColumnDef<T, any>[];
		header?: Snippet<[{ header: Header<T, unknown> }]>;
	};
</script>

<script lang="ts" generics="T">
	import { createTable, getCoreRowModel, type ColumnDef, type Header } from '@tanstack/table-core';

	let { data, columns, header: headerSnippet, ...restProps }: Props<T> = $props();

	let table = createTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onStateChange() {},
		renderFallbackValue() {},
		state: {}
	});
</script>

<table {...restProps}>
	<thead>
		{#each table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th>
						{#if !header.isPlaceholder}
							{#if headerSnippet}
								{@render headerSnippet({ header })}
							{:else}
								{header.}
							{/if}
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		<tr>
			<th>Expert delivery of an Ubuntu OpenStack cloud</th>
			<td>Reference architecture</td>
			<td>Custom architecture</td>
		</tr>
		<tr>
			<th>Workshop and training</th>
			<td>2-days</td>
			<td>4-days</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<th>One-time price</th>
			<td>$75,000</td>
			<td>$150,000</td>
		</tr>
	</tfoot>
</table>
