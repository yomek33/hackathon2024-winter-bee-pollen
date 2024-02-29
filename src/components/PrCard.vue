
<script>
  import japanmap from "./japanmap.vue";

  const url = 'https://hackathon.stg-prtimes.net/api/prefectures/1/releases'
  const token = import.meta.env.VITE_PRTIMES_TOKEN

  const releaseCard = {
    data() {
      return {
        items: [],
      };
    },
    onMounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await fetch(url, {
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
      }
    },
    watch: {
      // 変更したい値を監視する
      japanmap: { //監視したい値を入れる
        immediate: true,
        handler() {
          // japanmap が変更するとともに、fetchDataを実行する
          // こちらはviewなので監視するのみ？
          // Setupのhook理解できてない
          console.log('japanmap changed');
          this.fetchData();
        }
      }
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