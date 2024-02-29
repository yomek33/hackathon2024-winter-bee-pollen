<script>
import { watch } from "vue";
import store from "@/store.js";

const baseURL = 'https://hackathon.stg-prtimes.net/api/'
const token = import.meta.env.VITE_PRTIMES_TOKEN

const releaseCard = {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const path=`prefectures/${this.getPrefectureId()}/releases`
        const response = await fetch(baseURL+path, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        this.items = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    getPrefectureId() {
      console.log(store.state.prefectureId) // TODO: debuggerなので削除する
      return store.state.prefectureId
    }
  },
  created() {
    watch(() => store.state.prefectureId, (newValue, oldValue) => {
      this.getPrefectureId();
      console.log('prefectureId changed');
      this.fetchData();
    }, { immediate: true });
  }
};

export default releaseCard;
</script>


<template>
  <div>
    <button @click="fetchData">Search</button>
    <ul>
      <li v-for="item in items" >
        <div class = "flex flex-col mb-6 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 ">
          <img v-bind:src="item.main_image" class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"/>
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="text-lg font-bold mb-2 ">{{ item.title }}</h5>
            <p class="text-sm font-normal text-gray-700">{{ item.subtitle }}</p>
            <p class="text-sm font-normal text-gray-700">{{ item.created_at }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>