<script lang="ts">
	import { Tab, Tabs, TabContent } from '$lib/index.js';
</script>

<Tabs>
	{#snippet tabs()}
		<Tab key="manager">Charmed Operator Lifecycle Manager</Tab>
		<Tab key="operator">Charmed Operator SDK</Tab>
		<Tab key="charmhub">Charmhub</Tab>
	{/snippet}
	<TabContent key="manager">
		<p>
			A system to help you move from configuration management to application management across your
			hybrid cloud estate - through sharable, reusable, tiny applications called Charmed Operators.
		</p>
	</TabContent>
	<TabContent key="operator">
		<p>A set of tools to help you write Charmed Operators and to package them as Charms.</p>
	</TabContent>
	<TabContent key="charmhub">
		<p>A repository for charms - from Observability to Data to Identity and more.</p>
	</TabContent>
</Tabs>
