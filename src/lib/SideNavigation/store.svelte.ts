import { uniqueId } from '$lib/utils/uniqueId.js';
import { getContext, onDestroy, onMount, setContext } from 'svelte';

type Store = {
	onAccordionMount(accordionId: string): void;
	onAccordionDestroy(accordionId: string): void;
};

export function createSideNavigatonStore() {
	let accordionIds = $state<string[]>([]);

	setContext<Store>('SIDE_NAVIGATION', {
		onAccordionMount(accordionId: string) {
			accordionIds = [...accordionIds, accordionId];
		},
		onAccordionDestroy(accordionId: string) {
			accordionIds = accordionIds.filter((id) => id !== accordionId);
		}
	});

	return {
		get accordionIds() {
			return accordionIds;
		}
	};
}

export function useAccordion() {
	const id = uniqueId('side-navigation-accordion-');

	const accordionContext = getContext<Store>('SIDE_NAVIGATION');

	onMount(() => {
		if (accordionContext?.onAccordionMount) {
			accordionContext.onAccordionMount(id);
		}
	});

	onDestroy(() => {
		if (accordionContext?.onAccordionDestroy) {
			accordionContext.onAccordionDestroy(id);
		}
	});
}
