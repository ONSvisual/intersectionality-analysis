import adapter from '@sveltejs/adapter-static';
import { base_preview, base_prod } from "./src/app.config.js";

const base = process.env.APP_ENV === 'preview' ? base_preview : base_prod;
const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender:{
			handleHttpError:"warn",
			handleMissingId:"warn"
		},
		paths: {
			base: production ? base : '',
			relative: false,
		}
	}
};

export default config;
