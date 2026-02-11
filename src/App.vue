<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

const allowedOrigins = ['http://localhost:5171']

// Parent’ni URL’dan olamiz
function getParentOrigin() {
  const params = new URLSearchParams(window.location.search)
  return params.get('parent')
}

const form = reactive({
  ism: '',
  familiya: '',
})

const isDev = import.meta.env.DEV

onMounted(() => {
  const parentOrigin = getParentOrigin()

  // ✅ Agar iframe ichida bo‘lsa — allowlist tekshiruv
  if (parentOrigin) {
    if (!allowedOrigins.includes(parentOrigin)) {
      document.body.innerHTML = 'Access denied'
    }
  }
  // ✅ Agar o‘zi ochilgan bo‘lsa — faqat DEV da ruxsat
  else {
    if (!isDev) {
      document.body.innerHTML = 'Access denied'
    }
  }
})

// ✅ FAQAT TUGMA BOSILGANDA YUBORILADI
function sendData() {
  const parentOrigin = getParentOrigin()

  if (!allowedOrigins.includes(parentOrigin)) {
    alert('Ruxsat yo‘q')
    return
  }

  window.parent.postMessage(
    {
      type: 'FORM_DATA',
      value: { ...form },
    },
    parentOrigin,
  )
}
</script>
