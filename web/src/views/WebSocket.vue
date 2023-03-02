<script setup>
import { onMounted, ref } from 'vue';
import io from 'socket.io-client';

const messages = ref([]);
const content = ref('');
const send = () => {
  socket.emit('chat message', content.value);
  content.value = '';
}
let socket;
onMounted(() => {
  socket = io('http://localhost:3000');
  socket.on('connect', () => {
    console.log(socket.id, '监听客户端连接成功-connect');
  });
  socket.on('chat message', function (msg) {
    messages.value.push(msg);
  });

});
</script>
<template>
  <div>
    <form @submit.prevent="send">
      <input type="text" v-model="content">
      <button type="submit">Send</button>
    </form>
    <ul class="ul-class">
      <li v-for="msg of messages">{{ msg }}</li>
    </ul>
  </div>
</template>