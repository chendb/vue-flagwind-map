<template lang="html">
<l-generic>
    <div class="v-intro">
        <h1>Flagwind Map</h1>
        <h2>概述</h2>
        <p>
            在使用之前需要定义全局配置文件，一般是vue项目入口函数时定义。如下：<br/>
            <code>
setting.arcgis = {  ...setting.arcgis, ...{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arcgisApi: "http://192.168.101.39:8081/arcgis4js/library/3.21/",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routeUrl: "",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;center: [118.573, 37.446],<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wkid: 4326,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wkidFromApp: 4326,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;zoom: 9,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slider: false,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;basemap: "dark-gray-vector",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logo: false,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sliderPosition: "bottom-left"<br/>
&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
};<br/>
MapLoader.loadCss(setting.arcgis);<br/>
MapLoader.loadScript(setting.arcgis);<br/>
</code></p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :hideCode="true">
            <template slot="case">
                <fm-map vid="esri_map" mapType="arcgis"></fm-map>
            </template>
            <template slot="desc">
                <p></p>
            </template>
            <u-code slot="code" lang="html">{{code.default }}</u-code>
        </u-example>
    </div>
</l-generic>
</template>

<style lang="less" scoped>
.v-intro {
    padding: 20px 25px;
}
</style>

<script lang="ts">
import {
    component,
    View
} from "flagwind-web";
import * as code from "doc/codes/map";

@component
export default class Intro extends View {
    protected code: object = code;
}
</script>
