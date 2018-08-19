<template>
    <l-generic>
        <div class="v-intro">
            <h1>Flagwind Map</h1>
            <h2>概述</h2>
            <p><code>
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
                    <fw-map vid="esri_map"  mapType="arcgis"></fw-map>
                </template>
                <template slot="desc">
                    <p>在项目入口文件 src\index.ts 中添加如下代码:<br/>
                      、<code>height</code>属性改变 ECharts 实例的尺寸。</p>
                    <p>如果未显示指定<code>width</code>、<code>height</code>属性，则会动态计算容器的宽高做 ECharts 实例的尺寸。</p>
                </template>
                <u-code slot="code" lang="html">{{code.default }}</u-code>
            </u-example>

            
            <div class="api">
                <h2>API</h2>
                <h3>属性</h3>
                <table>
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>说明</th>
                            <th>数据类型</th>
                            <th>属性类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
    
                </table>

                <h3>事件</h3>
                <table>
                    <thead>
                        <tr>
                            <th>事件名</th>
                            <th>说明</th>
                            <th>参数</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

        </div>
    </l-generic>
</template>

<style lang="less" scoped>
.v-intro {
  padding: 20px 25px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "doc/codes/map";

@component
export default class Intro extends View {
  protected code: object = code;

  // protected setting = {
  //   arcgisApi: "http://192.168.101.39:8081/arcgis4js/library/3.21/",
  //   routeUrl: "",
  //   center: [118.573, 37.446],
  //   wkid: 4326,
  //   wkidFromApp: 4326,
  //   zoom: 9,
  //   slider: false,
  //   basemap: "dark-gray-vector",
  //   logo: false,
  //   sliderPosition: "bottom-left"
  // };
}
</script>
