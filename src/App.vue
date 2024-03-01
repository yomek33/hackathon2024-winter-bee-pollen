<script setup>
import { RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
import japanmap from "./components/japanmap.vue";
import PrCard from "@/components/PrCard.vue";
</script>

<template>
  <header></header>
  <HomeView />
  <!-- <japanmap /> -->
  <!-- <PrCard /> -->
  <RouterView />
</template>

<style scoped></style>
