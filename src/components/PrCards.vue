<script setup>
import { ref, watch } from 'vue'

const url = 'https://hackathon.stg-prtimes.net/api/prefectures/5/releases'
const token = import.meta.env.VITE_PRTIMES_TOKEN

const question = ref('')
const answer = ref('見たい地域を選択')
const loading = ref(false)

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })

      answer.value = await res.json()
      console.log(res.json())
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
    //  finally {
    //   loading.value = false
    //   answer.value = "Error! Timeout."
    // }
  }else{
    loading.value = false
    answer.value = "itznt y/n question"
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
    <!-- <input type="button" v-model="myRef" :disabled="load" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" /> -->
  </p>
  <p>{{ answer }}</p>
</template>