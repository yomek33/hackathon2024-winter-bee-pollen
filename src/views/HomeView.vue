<script>
import { computed } from 'vue'
// import store from '@/store.js'
import { prefecture } from '@/store.js'
import japanmap from '@/components/japanmap.vue'
import PrCard from '@/components/PrCard.vue'

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
  
  <main class="py-10 min-h-full flex-frow">
    <div class="flex justify-between w-10/12 mx-auto min-h-screen">
      <japanmap />
      <div class="w-1/2 ml-8 border-2 px-8 pb-8 rounded-lg overflow-auto">
        <div class=" sticky top-0 bg-white pt-8 pb-3">
          <h2 class="text-lg pb-5 top-0 bg-white">{{ prefertureName }}　リリース一覧</h2>
          
          <details class="accordion z-0">
            <summary><p class=" text-slate-800 hover:text-slate-400 hover:border-slate-400">業種で絞り込む</p></summary>
            <!-- <form class="checkbox pt-2 px-2 grid grid-cols-3"> -->
            <form class="checkbox pt-3 px-2">
              <div class="flex">
                <div class="w-5/12">
                  <label><input type="checkbox" name="" id="">水産・農林業</label>
                  <label><input type="checkbox" name="" id="">鉱業</label>
                  <label><input type="checkbox" name="" id="">建設業</label>
                  <label><input type="checkbox" name="" id="">製造業</label>
                  <label><input type="checkbox" name="" id="">電気・ガス業</label>
                  <label><input type="checkbox" name="" id="">倉庫・運輸関連業</label>
                  <label><input type="checkbox" name="" id="">情報通信</label>
                  <label><input type="checkbox" name="" id="">商業(卸売業、小売業)</label>
                  <label><input type="checkbox" name="" id="">金融・保険業</label>
                </div>
                <div class="w-7/12">
                  <label><input type="checkbox" name="" id="">不動産業</label>
                  <label><input type="checkbox" name="" id="">飲食店・宿泊業</label>
                  <label><input type="checkbox" name="" id="">医療・福祉</label>
                  <label><input type="checkbox" name="" id="">教育・学習支援業</label>
                  <label><input type="checkbox" name="" id="">サービス業</label>
                  <label><input type="checkbox" name="" id="">官公庁・地方自治体</label>
                  <label><input type="checkbox" name="" id="">財団法人・社団法人・宗教法人</label>
                </div>
              </div>
              <div class="mt-2 mb-1">
                <button class="mx-auto block px-5 py-0.5 rounded-md text-slate-600 hover:bg-slate-400 hover:text-white" type="submit">決定</button>
              </div>
            </form>
          </details>
        </div>

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
  width: 6px;
  height: 11px;
  border: solid #000;
  border-width: 0 2.5px 2.5px 0;
  content: '';
}

.checkbox input {
  display: none;
}

/* アコーディオンメニュー設定 */
.accordion {
    margin-bottom: 7px;
}

.accordion summary {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  position: relative;
  cursor: pointer;
}

.accordion summary p {
  border-bottom: 1px solid #333;
}

.accordion div button {
  border: 1px solid;
}

.accordion div button:hover {
  border-left: 4px;
}

.accordion summary::-webkit-details-marker {
  display: none;
}

.accordion summary::after {
    transform: rotate(-45deg) translateY(-10%);
    width: 7px;
    height: 7px;
    border-bottom: 2.5px solid #333333b3;
    border-right: 2.5px solid #333333b3;
    margin-left: 8px;
    content: '';
    transition: transform .3s;
}

.accordion[open] summary::after {
    transform: rotate(45deg) translateY(-35%);
}

.accordion form {
    transform: translateY(-10px);
    opacity: 0;
    margin: 0;
    transition: transform .5s, opacity .5s;
}

.accordion[open] form {
    transform: none;
    opacity: 1;
}

.accordion[open] {
    border: grey 1px solid;
    padding: 8px 8px;
    border-radius: 4px;
    margin: -8px -8px;
}
</style>