<script setup>
import { RouterLink, RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
import japanmap from "./components/japanmap.vue";
</script>

<template>
  <header></header>
  <HomeView />
  <japanmap />
  <RouterView />
</template>

<style scoped></style>
