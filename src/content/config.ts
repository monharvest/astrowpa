import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		image: z.string(),
		tags: z.array(z.string()).default([]),
		category: z.string().default('general')
	})
});

export const collections = { blog };
