import { getCollection } from 'astro:content';

export async function createSearchIndex() {
	const posts = await getCollection('blog');
	return posts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		slug: post.slug,
		image: post.data.image,
		content: post.body,
		category: post.data.category,
		tags: post.data.tags ?? []
	}));
}
