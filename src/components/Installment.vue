<script setup lang="ts">
import { computed } from 'vue'

type Step = {
  id: number
  title: string
  desc: string
  icon: 'cart' | 'file' | 'check' | 'package'
}

const steps = computed<Step[]>(() => [
  {
    id: 1,
    title: 'Выберите товар',
    desc: 'Найдите нужный товар у наших партнеров',
    icon: 'cart',
  },
  {
    id: 2,
    title: 'Оформите заявку',
    desc: 'Заполните простую форму онлайн',
    icon: 'file',
  },
  {
    id: 3,
    title: 'Получите одобрение',
    desc: 'Моментальное решение за несколько минут',
    icon: 'check',
  },
  {
    id: 4,
    title: 'Получите товар',
    desc: 'Начните платить частями после получения',
    icon: 'package',
  },
])

function iconSvg(name: Step['icon']) {
  if (name === 'cart') {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="h-8 w-8 transition-transform duration-500 group-hover:scale-110">
        <circle cx="8" cy="21" r="1"></circle>
        <circle cx="19" cy="21" r="1"></circle>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>`
  }
  if (name === 'file') {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="h-8 w-8 transition-transform duration-500 group-hover:scale-110">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        <path d="M10 9H8"></path>
        <path d="M16 13H8"></path>
        <path d="M16 17H8"></path>
      </svg>`
  }
  if (name === 'check') {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="h-8 w-8 transition-transform duration-500 group-hover:scale-110">
        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
        <path d="m9 11 3 3L22 4"></path>
      </svg>`
  }
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="h-8 w-8 transition-transform duration-500 group-hover:scale-110">
      <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
      <path d="M12 22V12"></path>
      <polyline points="3.29 7 12 12 20.71 7"></polyline>
      <path d="m7.5 4.27 9 5.15"></path>
    </svg>`
}
</script>

<template>
  <section id="how" class="py-20 bg-slate-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Как получить рассрочку</h2>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="(s, idx) in steps" :key="s.id" class="relative group">
          <!-- content -->
          <div class="flex flex-col items-center text-center">
            <div class="relative mb-6">
              <!-- glow -->
              <div
                class="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
              ></div>

              <!-- icon circle -->
              <div
                class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 relative z-10"
              >
                <div v-html="iconSvg(s.icon)"></div>
              </div>

              <!-- number bubble -->
              <div
                class="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-emerald-600 text-sm font-bold text-emerald-600 transition-all duration-500 group-hover:scale-125 group-hover:bg-emerald-600 group-hover:text-white z-20"
              >
                {{ s.id }}
              </div>
            </div>

            <h3
              class="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-emerald-600"
            >
              {{ s.title }}
            </h3>

            <p class="text-slate-600 transition-colors group-hover:text-slate-900">
              {{ s.desc }}
            </p>
          </div>

          <!-- connector line (only first 3 steps) -->
          <div
            v-if="idx < steps.length - 1"
            class="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-emerald-200 overflow-hidden"
          >
            <!-- animated fill -->
            <div
              class="h-full w-full bg-emerald-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
            ></div>

            <!-- arrow -->
            <div
              class="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-emerald-200 group-hover:border-l-emerald-500 transition-colors"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
