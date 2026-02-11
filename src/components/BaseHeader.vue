<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

type MenuItem = { label: string; to: string }

const router = useRouter()
const route = useRoute()

const menus = ref<MenuItem[]>([
  { label: 'О сервисе', to: '/about' },
  { label: 'Как это работает', to: '/how' },
  { label: 'Партнеры', to: '/partners' },
  { label: 'Вопросы', to: '/faq' },
  { label: 'Контакты', to: '/contacts' },
])

const lang = ref<'RU' | 'UZ' | 'EN'>('RU')

const isActive = (to: string) => route.path === to

function go(to: string) {
  router.push(to)
}

function setLang(v: 'RU' | 'UZ' | 'EN') {
  lang.value = v
  // Agar sizda i18n bo'lsa shu yerda almashtirasiz:
  // locale.value = v.toLowerCase()
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-black/10">
    <div class="container mx-auto px-4">
      <div class="h-16 flex items-center justify-between">
        <!-- LEFT: Logo -->
        <div class="flex items-center gap-3 cursor-pointer select-none" @click="go('/')">
          <div class="w-10 h-10 rounded-md bg-emerald-500 grid place-items-center">
            <span class="text-white font-bold text-lg leading-none">B</span>
          </div>
          <span class="text-2xl font-extrabold tracking-wide text-emerald-600">BAY</span>
        </div>

        <!-- CENTER: Menu -->
        <nav class="hidden md:flex items-center gap-8">
          <button
            v-for="m in menus"
            :key="m.to"
            @click="go(m.to)"
            class="relative text-[15px] font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
            :class="isActive(m.to) ? 'text-emerald-600 after:w-full' : ''"
          >
            {{ m.label }}
          </button>
        </nav>
        <div class="flex gap-6 items-center">
          <button
            @click="router.push('/account')"
            class="group relative cursor-pointer h-10 rounded-xl px-10 font-semibold text-white bg-emerald-600 overflow-hidden transition-all duration-300 hover:shadow-xl shadow-emerald-600/20"
          >
            <!-- hover gradient effect -->
            <span
              class="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></span>

            <span class="relative z-10">Вход</span>
          </button>

          <!-- RIGHT: Lang switch -->
          <div class="flex items-center gap-2">
            <div class="p-1 rounded-xl border border-black/10 bg-white">
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                :class="
                  lang === 'RU' ? 'bg-emerald-500 text-white' : 'text-slate-700 hover:bg-black/5'
                "
                @click="setLang('RU')"
              >
                RU
              </button>
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                :class="
                  lang === 'UZ' ? 'bg-emerald-500 text-white' : 'text-slate-700 hover:bg-black/5'
                "
                @click="setLang('UZ')"
              >
                UZ
              </button>
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                :class="
                  lang === 'EN' ? 'bg-emerald-500 text-white' : 'text-slate-700 hover:bg-black/5'
                "
                @click="setLang('EN')"
              >
                EN
              </button>
            </div>

            <button
              type="button"
              class="md:hidden w-10 h-10 rounded-xl border border-black/10 hover:bg-black/5 grid place-items-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Vue + Tailwind bilan hover underline "pastdan yuqoriga" yaxshi ko‘rinishi uchun:
   nav buttonlar uchun group kerak bo‘ladi. Shuni global qilamiz. */
nav button {
  position: relative;
}
nav button::before {
  content: '';
  display: none;
}
nav button {
  /* Tailwind'da group-hover ishlashi uchun */
}
nav button {
  /* Vue template'da classga group qo'shish osonroq, xohlasangiz pastdagi variantni ishlating:
     class="group relative ..."
  */
}
</style>
