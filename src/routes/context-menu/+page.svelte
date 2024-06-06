<script lang="ts">
	import {
		ContextMenu,
		ContextMenuCheckboxItem,
		ContextMenuGroup,
		ContextMenuItem,
		ContextMenuRadioGroup,
		ContextMenuRadioItem,
		ContextMenuSubMenu
	} from '$lib/index.js';

	let active: boolean = $state(false);
</script>

<p>
	Coucou les amis <ContextMenu trigger="clic droit">
		<ContextMenuGroup>
			<ContextMenuItem onclick={() => console.log('rouge')}
				>Bonjour, je m'appelle Jean-Jacques</ContextMenuItem
			>
			<ContextMenuCheckboxItem bind:checked={active}>Activé</ContextMenuCheckboxItem>
		</ContextMenuGroup>
		<ContextMenuGroup>
			<ContextMenuItem onclick={() => console.log('bleu')}>Bleu</ContextMenuItem>
			<ContextMenuSubMenu trigger="Vert">
				<ContextMenuGroup>
					<ContextMenuItem onclick={() => console.log('vert-pale')}>Vert pale</ContextMenuItem>
					<ContextMenuItem onclick={() => console.log('vert-fonce')}>Bleu foncé</ContextMenuItem>
				</ContextMenuGroup>
				<ContextMenuGroup>
					<ContextMenuRadioGroup>
						<ContextMenuRadioItem value="test A" />
						<ContextMenuRadioItem value="test B" />
					</ContextMenuRadioGroup>
				</ContextMenuGroup>
			</ContextMenuSubMenu>
		</ContextMenuGroup>
	</ContextMenu>
</p>
