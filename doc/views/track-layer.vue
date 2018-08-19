<template>
    <l-generic>
        <div class="v-intro">
            <h1>Track Layer</h1>
            <p>一标准化地图操作的api,为了屏蔽不同地图sdk对业务的影响,方便非地图专业人员很方便实现地图相关业务,目前对ArcGIS和Minemap两种不同地图SDK进行实现。</p>

            <h2>柱状图</h2>
            <u-example title="尺寸">
                <template slot="case">
                  <i-button @click="startTrack">播放</i-button>
                    <fw-map ref="fwAmap"  mapType="arcgis" @onMapLoad="onLoad" vid="esri_map" >
                      <fw-track-layer 
                          @getImageUrl="getImageUrl" 
                          @getImageAngle="getImageAngle" 
                          @on-build="onTrackBuild" 
                          :symbol="carSymbol"  >
                        <fw-point-layer 
                          :enableCluster="false" 
                          :enableEdit="true" 
                          :showInfoWindow="true" 
                          :symbol="pointSymbol" 
                          vid="tollgateLayer" 
                          @onLayerClick="onLayerClick" 
                          @changeStandardModel="onChangeStandardModel" 
                          :source="dataList">
                        </fw-point-layer>
                      </fw-track-layer>
                    </fw-map>

                </template>
                <template slot="desc">
                    <p>通过设置<code>width</code>、<code>height</code>属性改变 ECharts 实例的尺寸。</p>
                    <p>如果未显示指定<code>width</code>、<code>height</code>属性，则会动态计算容器的宽高做 ECharts 实例的尺寸。</p>
                </template>
                <!-- <u-code slot="code" lang="html">{{codes.bar}}</u-code> -->
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
import { component, View } from "flagwind-web";
import maps from "flagwind-map";

@component
export default class Intro extends View {
  protected dataList = [
    { id: "1", name: "张三", longitude: 118.5731, latitude: 37.61462 },
    { id: "2", name: "李娜", longitude: 118.1332, latitude: 37.48463 },
    { id: "3", name: "五三", longitude: 118.3833, latitude: 37.6466 },
    { id: "4", name: "原因", longitude: 118.5634, latitude: 37.9463 },
    { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }
  ];

  protected layer: maps.FlagwindTrackLayer;

  protected carSymbol = {
    height: 32,
    width: 32,
    imageUrl: "/static/map/car.png"
  };

  protected pointSymbol = {
    height: 32,
    width: 32,
    imageUrl: "/static/map/point.png"
  };

  protected getImageUrl(trackLine: maps.TrackLine, angle: number) {
    return "/static/map/car.png";
  }

  protected getImageAngle(trackLine: maps.TrackLine, angle: number) {
    return angle;
  }

  protected onTrackBuild(layer: maps.FlagwindTrackLayer) {
    this.layer = layer;
    layer.showTrackToolBox();
  }

  protected startTrack() {
    this.layer.startTrack(this.dataList);
  }

  protected onLayerClick(evt: any) {
    // console.log(evt.graphic.attributes);
    // alert(evt.graphic.attributes.name);
  }
  protected onChangeStandardModel(model: any) {
    return model;
  }
  protected onLoad() {
    //
  }

  /**
   * 演示需要的代码。
   * @protected
   * @member
   * @returns any
   */
  // protected codes: any = codes;
  /**
   * 演示需要的数据选项。
   * @protected
   * @member
   * @returns any
   */
  // protected options: any = options;
}
</script>
