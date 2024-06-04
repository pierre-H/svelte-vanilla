<script lang="ts">
	import { Accordion, AccordionItem } from '$lib';
</script>

<Accordion>
	<AccordionItem heading="What is MAAS?" id="what">
		MAAS expands to “Metal As A Service” – it converts bare-metal servers into cloud instances of
		virtual machines. There is no need to manage individual units. You can quickly provision or
		destroy machines, as if they were instances hosted in a public cloud like Amazon AWS, Google
		GCE, or Microsoft Azure.
	</AccordionItem>
	<AccordionItem heading="What MAAS offers" id="offers">
		MAAS can manage a large number of physical machines by merging them into user-defined resource
		pools. MAAS automatically provisions participating machines and makes them available for use.
		You can return unused machines to the assigned pool at any time.
	</AccordionItem>
	<AccordionItem id="works">
		{#snippet heading()}
			How MAAS works?
		{/snippet}

		When you add a new machine to MAAS, or elect to add a machine that MAAS has enlisted, MAAS
		commissions it for service and adds it to the pool. At that point, the machine is ready for use.
		MAAS keeps things simple, marking machines as “New,” “Commissioning,” “Ready,” and so on.
	</AccordionItem>
</Accordion>
