<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	const { data, z, xGet, yGet, xScale, yScale, zGet, zRange, custom, yDomain } = getContext('LayerCake');

	export let ghosts = null
	export let colours = ["#78b2e2","#fbb0b4"];
	export let highlighted
	// let coords = $custom.coords;
	let idKey = $custom.idKey;

	let colorHover = $custom.colorHover ? $custom.colorHover : 'orange';
	let colorSelect = $custom.colorSelect ? $custom.colorSelect : 'black';
	let colorHighlight = $custom.colorHighlight ? $custom.colorHighlight : 'black';
	let lineColor = $custom.lineColor ? $custom.lineColor : 'grey';
	let lineWidth = $custom.lineWidth ? $custom.lineWidth : 2;
	let radius = $custom.radius ? $custom.radius : 6;
	
</script>

{#if ghosts}
	<g class="ghost-group">
		{#each ghosts as ghoul,i}
			{#each ghoul as d,j}
			{#if j==0}
			<circle transition:fade|global
				cx={$xGet(d)}
				cy={$yGet(d) + ($yScale.bandwidth() / 2)}
				r="{radius}"
				stroke="{$z ? $zGet($data[i][j]) : $zRange[0]}"
				stroke-dasharray="1 2"
				fill="{colours[j]}"
				fill-opacity="{[...highlighted].includes($data[i][j][idKey]) && highlighted[1].includes(j) ? 1 : 0.1}"
			/>
			{:else if j==1}
			<rect transition:fade|global
				x={$xGet(d)-radius}
				y={$yGet(d) -radius + ($yScale.bandwidth() / 2)}
				width="{(radius-1)*2}"
				height="{(radius-1)*2}"
				stroke="{$z ? $zGet($data[i][j]) : $zRange[0]}"
				stroke-dasharray="1 2"
				fill="{colours[j]}"
				fill-opacity="{[...highlighted].includes($data[i][j][idKey]) && highlighted[1].includes(j) ? 1 : 0.1}"
			/>
			{/if}

			{/each}
		{/each}
	</g>
{/if}

<style>
	rect,circle{
		stroke-width: 1px;
	}

	rect{
		transform-box: fill-box;
		transform-origin: center;
		transform: rotate(45deg);
	}
</style>