<script>
import { computed } from 'vue'
// import store from '@/store.js'
import { prefecture } from '@/store.js'
import japanmap from '@/components/japanmap.vue'
import PrCard from '@/components/PrCardJob.vue'

export default {
    components: {
    japanmap,
    PrCard,
  },
  setup() {
    // ストアのステートをcomputedでラップして使用する
    const prefertureName = computed(() => prefecture.name)

    return { prefertureName }
  }
  
}
</script>

<template>
  <header class="bg-slate-800">
    <h1 class="pt-7 pb-5 ml-40 text-lg text-slate-200">
      都道府県別リリース一覧
    </h1>
  </header>
  <main class="py-10 min-h-full flex-grow">
    <div class="flex justify-between  w-10/12 mx-auto min-h-screen">
      <japanmap />
      <div class="w-1/2 ml-8 border-2 p-8 rounded-lg">
        <h2 class="text-lg mb-5">  {{ prefertureName }}　リリース一覧</h2>

        <details class="accordion">
          <summary>業種を選ぶ</summary>
          <div class="checkbox flex flex-wrap">
            <label class="flex items-center relative"
              ><input type="checkbox" name="" id="" />建築</label
            >
            <label><input type="checkbox" name="" id="" />金融サービス</label>
            <!-- ここはクリックするたびに変更するのか、選択してからまとめて変更するのか、どちらにしましょうか -->
          </div>
        </details>

        <div class="articles divide-y divide-slate-500/2">
          <PrCard />
        </div>
      </div>
    </div>
  </main>
  <footer
    class=" fixed inset-x-0 bottom-0 text-gray-400 text-sm bg-blue-500 pt-3 pb-3"
  >
    <p class="text-center">
      <small
        >Copyright &copy; 2024 hackathon2024-winter-BeePollen All rights
        reserved.</small
      >
    </p>
  </footer>
</template>

<style>
main {
  height: calc(100vh - 121px);
}
#container-left {
  height: 500px;
}

/* チェックボックス見た目変更 */
.checkbox {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em 2em;
  border: none;
}

.checkbox label {
  display: flex;
  align-items: center;
  gap: 0 0.5em;
  position: relative;
  cursor: pointer;
}

.checkbox label::before {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 2px solid #d6dde3;
  content: "";
}

.checkbox label:has(:checked)::after {
  position: absolute;
  top: 5px;
  left: 7px;
  transform: rotate(45deg);
  width: 5px;
  height: 10px;
  border: solid #000;
  border-width: 0 3px 3px 0;
  content: "";
}

.checkbox input {
  display: none;
}

/* アコーディオンメニュー設定 */
.accordion {
  max-width: 500px;
  margin-bottom: 7px;
}

.accordion summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: #333333;
  font-weight: 600;
  cursor: pointer;
}

.accordion summary::-webkit-details-marker {
  display: none;
}

/* .accordion summary::after {
    transform: translateY(-25%) rotate(45deg);
    width: 7px;
    height: 7px;
    margin-left: 10px;
    border-bottom: 3px solid #333333b3;
    border-right: 3px solid #333333b3;
    content: '';
    transition: transform .3s;
} */

.accordion[open] summary::after {
  transform: rotate(225deg);
}

.accordion div {
  transform: translateY(-10px);
  opacity: 0;
  margin: 0;
  padding: 0.3em 2em 1.5em;
  color: #333333;
  transition: transform 0.5s, opacity 0.5s;
}

.accordion[open] div {
  transform: none;
  opacity: 1;
}
</style>
