<script lang="ts">
	import { CodeSnippet, CodeSnippetLine, CodeSnippetDropdown } from '$lib';
</script>

{#snippet dropdowns()}
	<CodeSnippetDropdown>
		<option value="html">HTML</option>
		<option value="js">JS</option>
	</CodeSnippetDropdown>
{/snippet}

<CodeSnippet header="Test" numbered {dropdowns} bordered>
	<code>
		<CodeSnippetLine>snap 2.39.3</CodeSnippetLine>
		<CodeSnippetLine>snap 2540</CodeSnippetLine>
	</code>
</CodeSnippet>
