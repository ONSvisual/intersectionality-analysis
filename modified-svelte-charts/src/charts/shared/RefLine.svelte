<script>
	import { getContext } from 'svelte';
    import {draw,fade} from 'svelte/transition'
	const { xScale, yRange, yScale} = getContext('LayerCake');

	export let refvalue = null


</script>

{#if refvalue}
<path id='refline' in:draw|global out:fade|global
	d="m {$xScale(refvalue)} {$yRange[0]} l {$xScale(0)} {$yRange[1]}"
>
</path>
{/if}

<style>
	path{
		stroke:#B3B3B3;
		stroke-width: 2px;
        stroke-dasharray: 4 4;
	}
</style>