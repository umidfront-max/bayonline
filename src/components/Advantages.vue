<script setup lang="ts">
import { computed } from 'vue'

type Benefit = {
  title: string
  desc: string
  icon: 'percent' | 'zap' | 'clock' | 'shield'
  delay: string
}

const benefits = computed<Benefit[]>(() => [
  {
    title: 'Без переплат',
    desc: '0% переплаты - платите только стоимость товара',
    icon: 'percent',
    delay: '0s',
  },
  {
    title: 'Быстро',
    desc: 'Оформление занимает всего 5 минут онлайн',
    icon: 'zap',
    delay: '0.2s',
  },
  {
    title: 'Гибкие условия',
    desc: 'От 3 до 12 месяцев рассрочки',
    icon: 'clock',
    delay: '0.4s',
  },
  {
    title: 'Безопасно',
    desc: 'Защита персональных данных и конфиденциальность',
    icon: 'shield',
    delay: '0.6s',
  },
])

function iconSvg(name: Benefit['icon']) {
  // inline SVG (lucide-ga o'xshash)
  if (name === 'percent') {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="h-6 w-6">
        <line x1="19" x2="5" y1="5" y2="19"></line>
        <circle cx="6.5" cy="6.5" r="2.5"></circle>
        <circle cx="17.5" cy="17.5" r="2.5"></circle>
      </svg>`
  }
  if (name === 'zap') {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="h-6 w-6">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
      </svg>`
  }
  if (name === 'clock') {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="h-6 w-6">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>`
  }
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="h-6 w-6">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
    </svg>`
}
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Преимущества BAY</h2>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(b, i) in benefits"
          :key="b.title"
          class="benefit-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-2xl hover:border-emerald-300"
          :style="{ animationDelay: `${i * 0.18}s` }"
        >
          <!-- hover gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>

          <!-- top-right bubble (hover: bigger + higher) -->
          <div
            class="bubble absolute top-0 right-0 h-32 w-32 bg-emerald-100 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:bg-emerald-200"
          ></div>

          <!-- shimmer -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
            <div class="shimmer h-full w-1/2"></div>
          </div>

          <!-- content -->
          <div class="relative">
            <!-- icon -->
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 transition-all duration-300 group-hover:bg-emerald-600 group-hover:scale-110 group-hover:rotate-12"
            >
              <div
                class="text-emerald-600 group-hover:text-white transition-colors duration-300"
                v-html="iconSvg(b.icon)"
              />
            </div>

            <h3
              class="mb-2 text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors"
            >
              {{ b.title }}
            </h3>

            <p class="text-slate-600">
              {{ b.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* card doim float + rotate (tabiiy) */
.benefit-card {
  animation: waveRotate 3.2s ease-in-out infinite;
  will-change: transform;
  transform-origin: center;
}

@keyframes waveRotate {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    transform: translateX(0px);
  }
  50% {
    transform: translateY(-24px) rotate(5deg);
  }
}

/* bubble hover: yuqoriroq + kattaroq */
.benefit-card:hover .bubble {
  transform: translateY(-10px) scale(1.5);
}

/* shimmer */
.shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.85) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: shimmerMove 1.2s linear infinite;
}

@keyframes shimmerMove {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(220%);
  }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .benefit-card {
    animation: none;
  }
  .shimmer {
    animation: none;
  }
}
</style>
