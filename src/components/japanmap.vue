<template>
  <div id="chartdiv"></div>
  <div v-for="release in releases" :key="release.id">
    <span class="">
      {{ release.company_name }}
    </span>
  </div>
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
    const selectedPrefectureId = ref(0);
    const releases = ref([]);

    const loadMap = () => {
      // Mapを作る
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

      // Clickされたら、その県の名前を表示して着色する
      let activePolygon;
      polygonSeries.mapPolygons.template.events.on("click", (ev) => {
        const polygon = ev.target;
        if (activePolygon && activePolygon !== polygon) {
          activePolygon.states.applyAnimate("default");
          activePolygon = undefined;
          selectedPrefecture.value = polygon.dataItem.dataContext.name;
          console.log("Selected region:", selectedPrefecture.value);
          getReleasesByPrefectureName(selectedPrefecture.value); // 都道府県をIDに変換する
        }
        polygon.states.applyAnimate("highlight");
        activePolygon = polygon;
      });
      polygonSeries.mapPolygons.template.events.on("hover", (ev) => {
        const polygon = ev.target;
        polygon.states.applyAnimate("highlight");
      });
    };

    const getReleasesByPrefectureName = async () => {
      try {
        const prefectureId = await prefectureIdFromName('岩手県');
        console.log(prefectureId);
        await requestGetReleases(prefectureId);
      } catch (error) {
        console.error("Error occurred while getting releases:", error);
      }
    };

    // 都道府県の名前から都道府県のIDを取得する
    const prefectureIdFromName = async (selectedPrefectureName) => {
      const ACCESS_TOKEN = "37aaaf2e5398eec3521ca0408f9e0817999d81e014c000a3e65b55e6a807060c";
      const BASE_URL = "https://hackathon.stg-prtimes.net/api";
      const url = `${BASE_URL}/prefectures`;
      const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const prefecture = data.find(prefecture => prefecture.name === selectedPrefectureName);
      return prefecture ? prefecture.id : null;
    }

    // 特定の都道府県に紐づくRelease一覧を取得する
    const requestGetReleases = async (selectedPrefectureId) => {
      const ACCESS_TOKEN = "37aaaf2e5398eec3521ca0408f9e0817999d81e014c000a3e65b55e6a807060c";
      const BASE_URL = "https://hackathon.stg-prtimes.net/api";
      const url = `${BASE_URL}/prefectures/${selectedPrefectureId}/releases`;
      const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      releases.value = data; // 取得したJSONデータを releases に設定する
    };

    onMounted(() => {
      loadMap();
    });

    return { selectedPrefecture, selectedPrefectureId, releases };
  },
};
</script>

<style>
#chartdiv {
  width: 500px;
  height: 800px;
}
</style>
