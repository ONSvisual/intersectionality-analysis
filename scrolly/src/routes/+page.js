export const prerender = true;

import {getData} from "$lib/utils";

export async function load({ fetch }) {
	let data = await getData(`/data/data.csv`, fetch); // Array of data for all places

  return {data};
}