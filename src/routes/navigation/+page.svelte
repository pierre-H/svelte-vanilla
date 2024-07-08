<script lang="ts">
	import {
		NavigationLogo,
		Navigation,
		NavigationItem,
		NavigationDropdown,
		NavigationDropdownItem,
		NavigationDropdownSubMenu
	} from '$lib/index.js';

	let searchOpen = $state<boolean>(false);
</script>

<Navigation dark sliding search reduced bind:searchOpen>
	<NavigationItem href="/button">Button</NavigationItem>
	<NavigationDropdown label="Forms">
		<NavigationDropdownItem href="/forms#input">Input</NavigationDropdownItem>
		<NavigationDropdownSubMenu label="Select">
			<NavigationDropdownItem href="/forms#combobox">Combobox</NavigationDropdownItem>
			<NavigationDropdownItem href="/forms#radio">Radio</NavigationDropdownItem>
		</NavigationDropdownSubMenu>
		<NavigationDropdownItem href="/forms#checkbox">Checkbox</NavigationDropdownItem>
	</NavigationDropdown>
</Navigation>
<Navigation dark sliding search secondary bind:searchOpen>
	{#snippet logo()}
		<NavigationLogo
			href="/"
			src="https://assets.ubuntu.com/v1/b36b0862-Vanilla_icon_RGB_2022.svg"
			alt="Svelte Vanilla"
		/>
	{/snippet}
	<NavigationItem href="/button">Button</NavigationItem>
	<NavigationDropdown label="Forms">
		<NavigationDropdownItem href="/forms#input">Input</NavigationDropdownItem>
		<NavigationDropdownSubMenu label="Select">
			<NavigationDropdownItem href="/forms#combobox">Combobox</NavigationDropdownItem>
			<NavigationDropdownItem href="/forms#radio">Radio</NavigationDropdownItem>
		</NavigationDropdownSubMenu>
		<NavigationDropdownItem href="/forms#checkbox">Checkbox</NavigationDropdownItem>
	</NavigationDropdown>
</Navigation>
