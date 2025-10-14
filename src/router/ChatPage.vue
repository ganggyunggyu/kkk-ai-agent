<script setup lang="ts">
import ChatFooter from '@/components/widgets/ChatFooter.vue';
import ChatMain from '@/components/widgets/ChatMain.vue';
import ChatHeader from '@/components/widgets/ChatHeader.vue';
</script>

<template>
  <div class="app-container">
    <ChatHeader />
    <ChatMain />
    <ChatFooter />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100dvh;
  background-size: 100% 100%;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
</style>
