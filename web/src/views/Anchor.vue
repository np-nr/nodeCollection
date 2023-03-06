<!-- 一个锚点滚动例子 -->
<script setup>
import { ref } from 'vue'
const anchorList = [
  { id: 1, name: '锚点1' },
  { id: 2, name: '锚点2' },
]
const anchor = ref(null)

const scrollToAnchor = (id) => {
  const anchorElement = document.getElementById(id)
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

</script>
<template>
  <div class="header fixed top-0 h-4 w-full bg-lime-200"></div>
  <div class="anchor-container flex">
    <div class="ul-container">
      <ul class="side">
        <li v-for="item in anchorList" :key="item.id" @click="scrollToAnchor(item.id)">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="anchor-content">
      <div class="anchor-content-item" id="1">
        <h1>锚点1</h1>
        <p>锚点1内容</p>
      </div>
      <div class="anchor-content-item" id="2">
        <h1>锚点2</h1>
        <p>锚点2内容</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.anchor-container {
  .ul-container {
    width: 200px;
    height: 500px;
    overflow: auto;
  }

  .side {
    // side 侧边栏固定在左侧
    position: fixed;
    background-color: #fc0;
    height: 100%;
    width: 200px;
  }

  .anchor-content-item {
    width: 200px;
    height: 500px;
    background-color: #f5f5f5;
  }
}
</style>