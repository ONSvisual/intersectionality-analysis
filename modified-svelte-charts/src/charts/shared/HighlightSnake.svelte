<script>
	import { getContext } from 'svelte';
	import { draw,fade } from 'svelte/transition';
	import { line } from 'd3-shape';

	const { data, z, xGet, yGet, xScale, yScale, zGet, zRange, custom, yDomain } = getContext('LayerCake');

	export let snake = []
	
	$:lineGen = line()
		.x(d => $xGet(d))
		.y(d => $yGet(d)+$yScale.bandwidth()/2);

	
	// let coords = $custom.coords;
	let idKey = $custom.idKey;

	let colorHover = $custom.colorHover ? $custom.colorHover : 'orange';
	let colorSelect = $custom.colorSelect ? $custom.colorSelect : 'black';
	let colorHighlight = $custom.colorHighlight ? $custom.colorHighlight : 'black';
	let lineColor = $custom.lineColor ? $custom.lineColor : 'grey';
	let lineWidth = $custom.lineWidth ? $custom.lineWidth : 2;
	let radius = $custom.radius ? $custom.radius : 6;
</script>

{#if snake&&snake.length>0}
<path in:draw|global out:fade|global
	d="{lineGen(snake)}"
>
</path>
{/if}

<style>
	path{
		stroke:black;
		stroke-width: 3px;
	}
</style>