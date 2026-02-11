<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'
</script>

<template>
  <main class="flex-col justify-between min-h-screen">
    <BaseHeader />
    <div class="">
       <RouterView />
    </div>
    <BaseFooter />
  </main>
</template>
