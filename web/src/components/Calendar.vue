<!--
  一个日历组件，支持传入日期，不传默认当天，抛出单击事件，双击事件，对特定日期进行个性化渲染  
  
-->
<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  date: {
    type: Date,
    default: new Date()
  },
})

const emit = defineEmits(['click', 'dblclick'])

const currentDate = ref(props.date)
const currentMonth = computed(() => {
  return currentDate.value.getMonth()
})
const currentYear = computed(() => {
  return currentDate.value.getFullYear()
})

const getUniqueKey = () => {
  return Math.random().toString()
}
// 判断是否是今天
const isToday = (year, month, day) => {
  const today = new Date()
  return today.getFullYear() == year && today.getMonth() == month && today.getDate() == day
}
const days = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const firstDayWeek = firstDay.getDay()
  const lastDayWeek = lastDay.getDay()
  const firstDayDate = firstDay.getDate()
  const lastDayDate = lastDay.getDate()
  const firstDayMonth = firstDay.getMonth()
  const lastDayMonth = lastDay.getMonth()
  const firstDayYear = firstDay.getFullYear()
  const lastDayYear = lastDay.getFullYear()
  for (let i = 0; i < firstDayWeek; i++) {
    days.push({
      date: new Date(firstDayYear, firstDayMonth, firstDayDate - firstDayWeek + i).getDate(),
      type: 'prev',
      key: getUniqueKey()
    })
  }
  for (let i = 0; i < lastDayDate; i++) {
    days.push({
      date: new Date(currentYear.value, currentMonth.value, i + 1).getDate(),
      type: 'current',
      status: parseInt(Math.random() * 7),
      key: getUniqueKey(),
      isToday: isToday(currentYear.value, currentMonth.value, i + 1)
    })
  }
  for (let i = 0; i < 6 - lastDayWeek; i++) {
    days.push({
      date: new Date(lastDayYear, lastDayMonth, lastDayDate + i + 1).getDate(),
      type: 'next',
      key: getUniqueKey()
    })
  }
  return days
})

const prevMonth = () => {
  const month = currentMonth.value
  if (month === 0) {
    currentDate.value = new Date(currentYear.value - 1, 11, 1)
  } else {
    currentDate.value = new Date(currentYear.value, month - 1, 1)
  }
}

const prevYear = () => {
  currentDate.value = new Date(currentYear.value - 1, currentMonth.value, 1)
}

const nextMonth = () => {
  const month = currentMonth.value
  if (month === 11) {
    currentDate.value = new Date(currentYear.value + 1, 0, 1)
  } else {
    currentDate.value = new Date(currentYear.value, month + 1, 1)
  }
}

const nextYear = () => {
  currentDate.value = new Date(currentYear.value + 1, currentMonth.value, 1)
}
const clickDay = ref(NaN)
const handleClick = (date) => {
  clickDay.value = date
  emit('click', date)
}

const handleDblclick = (date) => {
  clickDay.value = date
  emit('dblclick', date)
}

watch(() => props.date, (newDate) => {
  currentDate.value = newDate
})

onMounted(() => {
  console.log('mounted')
})

</script>
<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="calendar-header-left">
        <span class="calendar-header-left-prev" @click="prevYear">&lt;&lt;</span>
        <span class="calendar-header-left-prev" @click="prevMonth">&lt;</span>
      </div>
      <div class="calendar-header-center">
        <span class="calendar-header-left-year">{{ currentYear }}年</span>
        <span class="calendar-header-left-month">-{{ currentMonth + 1 }}月</span>
      </div>
      <div class="calendar-header-right">
        <span class="calendar-header-right-next" @click="nextMonth">&gt;</span>
        <span class="calendar-header-right-next" @click="nextYear">&gt;&gt;</span>
      </div>
    </div>
    <div class="calendar-body">
      <div class="calendar-body-week">
        <div class="calendar-body-week-item">日</div>
        <div class="calendar-body-week-item">一</div>
        <div class="calendar-body-week-item">二</div>
        <div class="calendar-body-week-item">三</div>
        <div class="calendar-body-week-item">四</div>
        <div class="calendar-body-week-item">五</div>
        <div class="calendar-body-week-item">六</div>
      </div>
      <div class="calendar-body-day">
        <div v-for="day in days" :key="day.key" class="calendar-body-day-item" :class="{
          'calendar-body-day-item-prev': day.type === 'prev',
          'calendar-body-day-item-current': day.type === 'current',
          'calendar-body-day-item-next': day.type === 'next'
        }">
          <div class="calendar-body-day-item-span"
            :class="{ 'calendar-body-day-item-current-day': day.isToday, 'calendar-body-day-item-click-day': day.date == clickDay }"
            @click="handleClick(day.date)" @dblclick="handleDblclick(day.date)">
            {{ day.date }}
            <i class="calendar-body-day-item-icon" :class="'calendar-body-day-item-icon-' + day.status"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.calendar-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #333333;

  .calendar-header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(14, 97, 255, 0.1);
    border-radius: 0px 0px 4px 4px;

    .calendar-header-left {
      display: flex;
      align-items: center;

      .calendar-header-left-prev {
        margin-left: 20px;
        cursor: pointer;
      }
    }

    .calendar-header-center {
      margin: 0 20px;
    }

    .calendar-header-right {
      display: flex;
      align-items: center;

      .calendar-header-right-next {
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }

  .calendar-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .calendar-body-week {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;

      .calendar-body-week-item {
        width: calc(100% / 7);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #bbb;
      }
    }

    .calendar-body-day {
      width: 100%;
      height: calc(100% - 30px);
      display: flex;
      flex-wrap: wrap;

      .calendar-body-day-item {
        width: calc(100% / 7);
        height: calc((100% - 30px) / 6);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;

        &-prev {
          color: #bbb;
        }

        &-current {
          color: #000;
        }

        &-next {
          color: #bbb;
        }

        &-span {
          position: relative;
          display: inline-block;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 26px;
          height: 26px;
          cursor: pointer;
        }

        &-span:hover {
          background: rgba(14, 97, 255, 0.6);
          border-radius: 2px;
          color: #fff;
        }

        &-current-day {
          background-color: #0E61FF;
          color: #fff;
          border-radius: 50%;
        }

        &-click-day {
          background-color: #0E61FF;
          color: #fff;
        }

        &-icon {
          position: absolute;
          display: inline-block;
          top: 0;
          right: -4px;
          width: 6px;
          height: 6px;
          border-radius: 50%;

          &-1 {
            background: #00A870;
          }

          &-2 {
            background: #999999;
          }

          &-3 {

            background: #0E61FF;
          }

          &-4 {

            background: #E44D58;
          }

          &-5 {
            background-color: #fff;
            border: 1px solid #E44D58;
          }
        }
      }
    }
  }
}
</style>