<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

type MenuItem = { label: string; to: string; sectionId?: string }

const router = useRouter()
const route = useRoute()

const menus = ref<MenuItem[]>([
  { label: 'О сервисе', to: '/about', sectionId: 'about' },
  { label: 'Как это работает', to: '/how', sectionId: 'how' },
  { label: 'Партнеры', to: '/partners', sectionId: 'partners' },
  { label: 'Вопросы', to: '/faq', sectionId: 'faq' },
  { label: 'Контакты', to: '/contacts', sectionId: 'contacts' },
])

const lang = ref<'RU' | 'UZ' | 'EN'>('RU')
const activeSection = ref<string>('')

const isActive = (m: MenuItem) =>
  activeSection.value === m.sectionId || route.path === m.to

function go(m: MenuItem) {
  if (m.sectionId) {
    // Agar biz home sahifasida bo'lsak — to'g'ridan-to'g'ri scroll
    if (route.path === '/') {
      scrollToSection(m.sectionId)
    } else {
      // Boshqa sahifadan kelayotgan bo'lsak, avval home'ga o'tamiz, keyin scroll
      router.push('/').then(() => {
        setTimeout(() => scrollToSection(m.sectionId!), 100)
      })
    }
  } else {
    router.push(m.to)
  }
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const headerHeight = 64 // h-16 = 64px
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 16

  window.scrollTo({ top, behavior: 'smooth' })
  activeSection.value = id
}

function setLang(v: 'RU' | 'UZ' | 'EN') {
  lang.value = v
  // Agar sizda i18n bo'lsa shu yerda almashtirasiz:
  // locale.value = v.toLowerCase()
}

// Scroll orqali active sectionni aniqlash (IntersectionObserver)
import { onMounted, onUnmounted } from 'vue'

let observer: IntersectionObserver | null = null

onMounted(() => {
  const sectionIds = menus.value.map((m) => m.sectionId).filter(Boolean) as string[]

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-64px 0px -60% 0px', // header balandligini hisobga oladi
      threshold: 0,
    },
  )

  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-black/10">
    <div class="container mx-auto px-4">
      <div class="h-16 flex items-center justify-between">
        <!-- LEFT: Logo -->
        <div class="flex items-center gap-3 cursor-pointer select-none" @click="router.push('/')">
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
            @click="go(m)"
            class="relative text-[15px] font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
            :class="isActive(m) ? 'text-emerald-600 after:!w-full' : ''"
          >
            {{ m.label }}
          </button>
        </nav>

        <div class="flex gap-6 items-center">
          <button
            @click="router.push('/account')"
            class="group relative cursor-pointer h-10 rounded-xl px-10 font-semibold text-white bg-emerald-600 overflow-hidden transition-all duration-300 hover:shadow-xl shadow-emerald-600/20"
          >
            <span
              class="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></span>
            <span class="relative z-10">Вход</span>
          </button>

          <!-- RIGHT: Lang switch -->
          <div class="flex items-center gap-2">
            <div class="p-1 rounded-xl border border-black/10 bg-white">
              <button
                v-for="l in (['RU', 'UZ', 'EN'] as const)"
                :key="l"
                type="button"
                class="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                :class="lang === l ? 'bg-emerald-500 text-white' : 'text-slate-700 hover:bg-black/5'"
                @click="setLang(l)"
              >
                {{ l }}
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
nav button {
  position: relative;
}
</style>