<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuCheckboxItem,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSubMenu
	} from '$lib/index.js';

	let active = $state<boolean | 'indeterminate'>(false);
</script>

<p>
	Coucou les amis <DropdownMenu icon="settings">
		<DropdownMenuGroup>
			<DropdownMenuItem href="https://google.fr" target="_blank"
				>Bonjour, je m'appelle Jean-Jacques</DropdownMenuItem
			>
			<DropdownMenuCheckboxItem bind:checked={active}>Activé</DropdownMenuCheckboxItem>
		</DropdownMenuGroup>
		<DropdownMenuGroup>
			<DropdownMenuItem onclick={() => console.log('bleu')}>Bleu</DropdownMenuItem>
			<DropdownMenuSubMenu trigger="Vert">
				<DropdownMenuGroup>
					<DropdownMenuItem onclick={() => console.log('vert-pale')}>Vert pale</DropdownMenuItem>
					<DropdownMenuItem onclick={() => console.log('vert-fonce')}>Bleu foncé</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuRadioGroup>
						<DropdownMenuRadioItem value="test A" />
						<DropdownMenuRadioItem value="test B" />
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuSubMenu>
		</DropdownMenuGroup>
	</DropdownMenu>
</p>
