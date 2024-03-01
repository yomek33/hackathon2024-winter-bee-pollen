<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_japanLow from "@amcharts/amcharts5-geodata/japanLow";

import { ref, onMounted } from "vue";
import { prefecture }from '@/store.js'

// import { ref, onMounted} from "vue";
// import store, { prefecture } from "@/store.js";


export default {
  name: "japanmap",

  setup() {
    const selectedPrefecture = ref(null);
    const selectedPrefectureId = ref(0);
    const releases = ref([]);

    // NOTE: 日本地図を描写し、クリックした都道府県のプレスリリースを一覧で表示させる
    // Mapを作る
    const loadMap = () => {
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
        selectedPrefecture.value = polygon.dataItem.dataContext.name;
        console.log("Selected region:", selectedPrefecture.value);
        polygon.states.applyAnimate("highlight");

        if (activePolygon && activePolygon !== polygon) {
          activePolygon.states.applyAnimate("default");
        }

        activePolygon = polygon;
        getReleasesByPrefectureName(selectedPrefecture.value); // NOTE: プレスリリース一覧を取得
      });

      polygonSeries.mapPolygons.template.events.on("hover", (ev) => {
        const polygon = ev.target;
        polygon.states.applyAnimate("highlight");
      });
    };
    // NOTE: クリックによって渡された都道府県（アルファベット）をゴニョゴニョ変換してプレスリリースを取得する
    const getReleasesByPrefectureName = async (prefectureNameEn) => {
      try {
        // ex.) Iwate → 岩手県
        const prefectureName = prefectureNames[prefectureNameEn]
        // store.commit('updatePrefectureName', prefectureName);
        // console.log(store.state.prefectureName) // TODO: debuggerなので削除する
        // ex.) 岩手県 → 5
        const prefectureId = await prefectureIdFromName(prefectureName);
        // ex.) 岩手県のID:5をもとに、岩手県のプレスリリースを取得
        // NOTE: storeで管理しているprefectureIdに上書きする。

        // console.log(store.state.prefectureId) // TODO: debuggerなので削除する
        // store.commit('updatePrefectureId', prefectureId);
        prefecture.id = prefectureId;
        prefecture.name=prefectureName;
      } catch (error) {
        console.error("Error occurred while getting releases:", error);
      }
    };

    // NOTE: 都道府県の名前（日本語）から都道府県のIDを取得する
    const prefectureIdFromName = async (selectedPrefectureName) => {
      // TODO: 環境変数にしまう
      const ACCESS_TOKEN =
        "37aaaf2e5398eec3521ca0408f9e0817999d81e014c000a3e65b55e6a807060c";
      const BASE_URL = "https://hackathon.stg-prtimes.net/api";
      const url = `${BASE_URL}/prefectures`;
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const prefecture = data.find(
        (prefecture) => prefecture.name === selectedPrefectureName
      );
      return prefecture ? prefecture.id : null;
    };

    const prefectureNames = {
      Aichi: "愛知県",
      Akita: "秋田県",
      Aomori: "青森県",
      Chiba: "千葉県",
      Ehime: "愛媛県",
      Fukui: "福井県",
      Fukuoka: "福岡県",
      Fukushima: "福島県",
      Gifu: "岐阜県",
      Gunma: "群馬県",
      Hiroshima: "広島県",
      Hokkaido: "北海道",
      Hyogo: "兵庫県",
      Ibaraki: "茨城県",
      Ishikawa: "石川県",
      Iwate: "岩手県",
      Kagawa: "香川県",
      Kagoshima: "鹿児島県",
      Kanagawa: "神奈川県",
      Kochi: "高知県",
      Kumamoto: "熊本県",
      Kyoto: "京都府",
      Mie: "三重県",
      Miyagi: "宮城県",
      Miyazaki: "宮崎県",
      Nagano: "長野県",
      Nagasaki: "長崎県",
      Nara: "奈良県",
      Niigata: "新潟県",
      Oita: "大分県",
      Okayama: "岡山県",
      Okinawa: "沖縄県",
      Osaka: "大阪府",
      Saga: "佐賀県",
      Saitama: "埼玉県",
      Shiga: "滋賀県",
      Shimane: "島根県",
      Shizuoka: "静岡県",
      Tochigi: "栃木県",
      Tokushima: "徳島県",
      Tokyo: "東京都",
      Tottori: "鳥取県",
      Toyama: "富山県",
      Wakayama: "和歌山県",
      Yamagata: "山形県",
      Yamaguchi: "山口県",
      Yamanashi: "山梨県",
    };
    // NOTE: 最初に日本地図を描画するのに必要
    onMounted(() => {
      loadMap();
    });
    // onUnmounted(() => {
    //   if (chart) {
    //     chart.dispose();
    //   }
    // });
    return { selectedPrefecture, selectedPrefectureId, releases };
  },
};
</script>

<style>
#chartdiv {
  width: 700px;
  height: 1000px;
}
</style>
