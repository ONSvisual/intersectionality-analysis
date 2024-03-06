<script>
	import { getContext } from 'svelte';
    import { text } from 'svelte/internal';
	import {fade, blur, slide, scale} from 'svelte/transition';

	const { data, z, xScale, yScale, yGet, zGet, zRange, custom, yDomain } = getContext('LayerCake');

	export let hovered = null;
	export let selected = null;
	export let highlighted = [""];
	// export let overlayFill = false;
	export let other = [];

	let coords = $custom.coords;
	let idKey = $custom.idKey;

	let colorHover = $custom.colorHover ? $custom.colorHover : 'orange';
	let colorSelect = $custom.colorSelect ? $custom.colorSelect : 'black';
	let colorHighlight = $custom.colorHighlight ? $custom.colorHighlight : 'black';
	let lineColor = $custom.lineColor ? $custom.lineColor : 'grey';
	let lineWidth = $custom.lineWidth ? $custom.lineWidth : 2;
	let radius = $custom.radius ? $custom.radius : 6;

</script>

{#if $coords}
<!-- <g class="line-group">
	{#each $coords.map(d => ({x: d.map(e => e.x), y: d[0].y})) as d}
	<line
		x1="{$xScale(Math.min(...d.x))}"
		x2="{$xScale(Math.max(...d.x))}"
		y1="{$yScale(d.y) + ($yScale.bandwidth() / 2)}"
		y2="{$yScale(d.y) + ($yScale.bandwidth() / 2)}"
		stroke="{lineColor}"
		stroke-width="{lineWidth}"
	/>
	{/each}
</g> -->
<g class="dot-group">
	{#each $coords as group, i}
	  {#each group as d, j}
			{#if j==0}
			<circle
				cx={$xScale(d.x)}
				cy={$yScale(d.y) + ($yScale.bandwidth() / 2)}
				r="{radius}"
				fill="{$z ? $zGet($data[i][j]) : $zRange[0]}"
				opacity="{highlighted ? highlighted[0]!=null ? [...highlighted].includes($data[i][j][idKey])&&highlighted[1].includes(j) ? 1 : 0.25 : 1 : 1}"
			/>				
			{:else if j==1}
			<rect
				x={$xScale(d.x)-radius}
				y={$yScale(d.y) -radius + ($yScale.bandwidth() / 2)}
				width="{radius*2}"
				height="{radius*2}"
				fill="{$z ? $zGet($data[i][j]) : $zRange[0]}"
				opacity="{highlighted ? highlighted[0]!=null ? [...highlighted].includes($data[i][j][idKey])&&highlighted[1].includes(j) ? 1 : 0.25 : 1 : 1}"
			/>
			{/if}
			
		{/each}
	{/each}

	{#if idKey && (hovered || selected || highlighted )}
	{#each $coords as group, i}
		{#each group as d, j}
			{#if [...highlighted, selected, hovered].includes($data[i][j][idKey])}
				{#if (j==0&&highlighted[1].includes(j))}
				<circle transition:fade|global
					class='pulse'
					cx={$xScale(d.x)}
					cy={$yScale(d.y)+ ($yScale.bandwidth() / 2)}
					r={radius}
					fill="{$z ? $zGet($data[i][j]) : $zRange[0]}"
					stroke="{$data[i][j][idKey] == hovered ? colorHover : $data[i][j][idKey] == selected ? colorSelect : colorHighlight}"
					stroke-width="{$data[i][j][idKey] == hovered || $data[i][j][idKey] == selected || highlighted.includes($data[i][j][idKey]) ? lineWidth : 0}"
					opacity="{highlighted[0]!=undefined ? [...highlighted].includes($data[i][j][idKey])&&highlighted[1].includes(j) ? 1 : 0.25 : 1}"
				/>
				{:else if (j==1&&highlighted[1].includes(j))}
					<rect transition:fade|global class='pulse'
					x={$xScale(d.x)-radius}
					y={$yScale(d.y) -radius + ($yScale.bandwidth() / 2)}
					width="{(radius-1)*2}"
					height="{(radius-1)*2}"
					fill="{$z ? $zGet($data[i][j]) : $zRange[0]}"
					stroke="{$data[i][j][idKey] == hovered ? colorHover : $data[i][j][idKey] == selected ? colorSelect : colorHighlight}"
					stroke-width="{$data[i][j][idKey] == hovered || $data[i][j][idKey] == selected || highlighted.includes($data[i][j][idKey]) ? lineWidth : 0}"
					opacity="{highlighted[0]!=undefined ? [...highlighted].includes($data[i][j][idKey])&&highlighted[1].includes(j) ? 1 : 0.25 : 1}"
				/>
				{/if}
			{/if}
		{/each}
	{/each}
	{/if}

	{#if other}
	{#each $coords as group, i}
		{#each group as d, j}
			{#if other.includes($data[i][j][idKey])}
				{#if (j==0&&other.includes(j))}
				<circle transition:fade|global
					class='pulse'
					cx={$xScale(d.x)}
					cy={$yScale(d.y)+ ($yScale.bandwidth() / 2)}
					r={radius}
					fill="{$z ? $zGet($data[i][j]) : $zRange[0]}"
					stroke="{$data[i][j][idKey] == hovered ? colorHover : $data[i][j][idKey] == selected ? colorSelect : colorHighlight}"
					stroke-width="{$data[i][j][idKey] == hovered || $data[i][j][idKey] == selected || highlighted.includes($data[i][j][idKey]) ? lineWidth : 0}"
					opacity="{highlighted[0]!=undefined ? other.includes($data[i][j][idKey])&&other.includes(j) ? 1 : 0.25 : 1}"
				/>
				{:else if (j==1&&other.includes(j))}
					<rect transition:fade|global class='pulse'
					x={$xScale(d.x)-radius}
					y={$yScale(d.y) -radius + ($yScale.bandwidth() / 2)}
					width="{radius*2}"
					height="{radius*2}"
					fill="{$z ? $zGet($data[i][j]) : $zRange[0]}"
					stroke="{$data[i][j][idKey] == hovered ? colorHover : $data[i][j][idKey] == selected ? colorSelect : colorHighlight}"
					stroke-width="{$data[i][j][idKey] == hovered || $data[i][j][idKey] == selected || highlighted.includes($data[i][j][idKey]) ? lineWidth : 0}"
					opacity="{highlighted[0]!=undefined ? other.includes($data[i][j][idKey])&&other.includes(j) ? 1 : 0.25 : 1}"
				/>
				{/if}
			{/if}
		{/each}
	{/each}
	{/if}
</g>
{/if}

<style>
	.pulse{
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse{
		0% {
			stroke-width: 2;
		}
		50% {
			stroke-width: 6;
		}
		100% {
			stroke-width: 2;
		}
	}

	rect{
		transform-box: fill-box;
		transform-origin: center;
		transform: rotate(45deg);
	}
</style>
