<template>
  <div id="chartdiv" style="width: 100%; height: 500px"></div>
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
      const root = am5.Root.new("chartdiv");
      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "rotateX",
          panY: "translateY",
          projection: am5map.geoMercator(),
          homeGeoPoint: { longitude: 0, latitude: 0 },
        })
      );

      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_japanLow,
          valueField: "value",
          calculateAggregates: true,
        })
      );

      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true,
        templateField: "settings",
      });

      polygonSeries.mapPolygons.template.events.on("hover", {
        fill: am5.Color.fromHex(0xffba00),
      });

      let activePolygon;
      polygonSeries.mapPolygons.template.events.on("click", (ev) => {
        const polygon = ev.target;
        if (activePolygon !== polygon) {
          for (let i = 0; i < polygonSeries.mapPolygons.length; i++) {
            const polygon = polygonSeries.mapPolygons.getIndex(i);
            polygon.set("fill", am5.Color.fromHex(0x6794dc));
          }
          polygon.set("fill", am5.Color.fromHex(0x85c5e3));
          activePolygon = polygon;
          selectedPrefecture.value = polygon.dataItem.dataContext.name;
          console.log("Selected region:", selectedPrefecture.value);
        }
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
  width: 100%;
  height: 500px;
}
</style>
