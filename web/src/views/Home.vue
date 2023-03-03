<template>
  <h1>home</h1>
  <div class="calendar-parent">
    <Calendar />
  </div>
</template>
<script setup>
import Calendar from '@/components/Calendar.vue'
</script>
<style lang="scss" scoped>
.calendar-parent {
  width: 500px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid rgba(14, 97, 255, 0.2);
}
</style>