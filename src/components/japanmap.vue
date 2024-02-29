<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_japanLow from "@amcharts/amcharts5-geodata/japanLow";
import { ref, onMounted } from "vue";

export default {
  name: "MapComponent",
  setup() {
    const selectedPrefecture = ref(null);

    const loadMap = () => {
      //Mapを作る
      const root = am5.Root.new("chartdiv");
      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          projection: am5map.geoMercator(),
          homeGeoPoint: { longitude: 0, latitude: 0 },
          panX: "none",
          panY: "none",
          wheelX: "none",
          wheelY: "none",
          pinchZoom: false,
        })
      );

      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_japanLow,
          valueField: "value",
          calculateAggregates: true,
          fill: am5.color(0xf3f3f3),
          stroke: am5.color(0x000000),
        })
      );

      polygonSeries.mapPolygons.template.setAll({
        interactive: true,
        templateField: "settings",
      });

      polygonSeries.mapPolygons.template.states.create("highlight", {
        fill: am5.color(0x6794dc),
        stroke: am5.color(0x6794dc),
      });

      //Clickされたら、その県の名前を表示して着色する
      let activePolygon;
      polygonSeries.mapPolygons.template.events.on("click", (ev) => {
        const polygon = ev.target;
        if (activePolygon && activePolygon !== polygon) {
          activePolygon.states.applyAnimate("default");
          activePolygon = undefined;
        }
        selectedPrefecture.value = polygon.dataItem.dataContext.name;
        console.log("Selected region:", selectedPrefecture.value);
        polygon.states.applyAnimate("highlight");
        activePolygon = polygon;
      });
      polygonSeries.mapPolygons.template.events.on("hover", (ev) => {
        const polygon = ev.target;
        polygon.states.applyAnimate("highlight");
      });
    };
    onMounted(() => {
      loadMap();
    });

    return { selectedPrefecture };
  },
};
</script>

<style>
#chartdiv {
  width: 500px;
  height: 800px;
}
</style>
