const bar = `
<template>
    <fw-map vid="esri_map" :setting="setting" mapType="arcgis"></fw-map>
</template>

<script lang="ts">

import { component, View } from "flagwind-web";

@component
export default class Map extends View
{
    protected setting = {
        arcgisApi: "https://js.arcgis.com/3.21/",
        routeUrl: "",
        center: [118.573, 37.446],
        wkid: 4326,
        wkidFromApp: 4326,
        zoom: 9,
        slider: false,
        basemap: "dark-gray-vector",
        logo: false,
        sliderPosition: "bottom-left"
    };
}
</script>`;

export default bar;
