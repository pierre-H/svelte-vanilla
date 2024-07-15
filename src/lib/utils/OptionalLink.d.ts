import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

export type OptionalLink = Partial<
	Omit<HTMLAnchorAttributes, keyof HTMLAttributes<HTMLAnchorElement>>
>;
