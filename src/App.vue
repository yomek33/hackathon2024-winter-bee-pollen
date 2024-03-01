<script setup>
import { RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
import PrCard from "@/components/PrCard.vue";
</script>

<template>
  <header></header>
  <HomeView />
  <!-- <PrCard /> -->
  <RouterView />
</template>

<style scoped></style>
