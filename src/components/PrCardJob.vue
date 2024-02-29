
<script>
  import { watch } from "vue";
  import { prefecture, job } from "@/store.js";

  const baseURL = 'https://hackathon.stg-prtimes.net/api/'
  const token = import.meta.env.VITE_PRTIMES_TOKEN
  const cache = { //キャッシュ コンポーネント単位で持つべきではない
    0:[],
    1:[],
    2:[],
    3:[],
    4:[],
    5:[],
    6:[],
    7:[],
    8:[],
    9:[],
    10:[],
    11:[],
    //12:[],
    13:[],
    14:[],
    15:[],
  };
  
  const releaseCard = {
    data() {
      return {
        items: [],
      };
    },
    methods: {
      async fetchData() {
        console.log('onclick function called');
        try {
          const path = `prefectures/${prefecture.id}/releases`
          const response = await fetch(baseURL+path, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            query: {
              per_page: 500,
            }
          });
          const data = await response.json();
          const newdata = data.filter((item) => {
            this.getJob(item.companies_id)
          });
          console.log(newdata);
          this.items = newdata;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      async getJob(companies_id) {
        if(companies_id in cache[job.id]) {
          return true
        }
        try {
          const path = `industries/${job.id}/companies`
          const response = await fetch(baseURL+path, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            query: {
              per_page: 300
            }
          });
          const data = await response.json();
          if(data.industry_id == job.id) {
            cache[job.id].push(companies_id)
            return true
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    },
    created() {
      watch(() => prefecture.id, (newValue, oldValue) => {
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
            <p class="text-sm font-normal text-gray-700">{{ item.created_at }} {{ item.prefecture_id }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>