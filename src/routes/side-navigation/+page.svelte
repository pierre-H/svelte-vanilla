<script lang="ts">
	import {
		SideNavigationDrawer,
		SideNavigationHeading,
		SideNavigationList,
		SideNavigationItem,
		SideNavigationAccordion,
		SideNavigationStatus,
		SideNavigationIcon
	} from '$lib/index.js';
	import StatusLabel from '$lib/StatusLabel/StatusLabel.svelte';
</script>

<div style="width: 300px">
	<SideNavigationDrawer>
		{#snippet toggle(open)}
			{#if open}Fermer{:else}Ouvrir{/if}
		{/snippet}
		<SideNavigationHeading>Hello</SideNavigationHeading>
		<SideNavigationList>
			<SideNavigationItem>JHello</SideNavigationItem>
			<SideNavigationAccordion label="Coucou">
				<SideNavigationList>
					<SideNavigationItem currentPage href="#">Item A</SideNavigationItem>
					<SideNavigationItem
						>Item B
						<SideNavigationIcon name="warning" />
					</SideNavigationItem>
				</SideNavigationList>
				<SideNavigationList>
					<SideNavigationItem
						>Item C
						<SideNavigationStatus>
							<StatusLabel color="positive">New</StatusLabel>
						</SideNavigationStatus>
					</SideNavigationItem>
				</SideNavigationList>
			</SideNavigationAccordion>
		</SideNavigationList>
	</SideNavigationDrawer>
</div>
