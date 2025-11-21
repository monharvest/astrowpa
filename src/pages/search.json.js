import { createSearchIndex } from '../search/createIndex.js';

export async function GET() {
	const index = await createSearchIndex();
	return new Response(JSON.stringify(index), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=0, must-revalidate'
		}
	});
}
