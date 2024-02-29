<script setup>
"use strict";
import {ref} from 'vue'


const url = 'https://hackathon.stg-prtimes.net/api/prefectures/5/releases'
const token = import.meta.env.VITE_PRTIMES_TOKEN
const items = ref([])
const getData = async() => {
  try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })

      return await res.json()
    } catch (error) {
      return ("Error! Could not reach the API. " )
    }
}
const data = Promise.resolve(getData())
console.log(data.Result)
// if(data !==){
//   items.value = data
// }

</script>

<template>
  <div class="bg-white ">
    

<div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <ul id="example-1">  
  <li v-for="item in items">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.volumeInfo.title }} </h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
  </li>
</ul>
</div>


  </div>
</template>