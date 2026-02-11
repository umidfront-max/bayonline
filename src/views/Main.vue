<script setup lang="ts">
import { computed } from 'vue'
import Advantages from '@/components/Advantages.vue'
import Installment from '@/components/Installment.vue'
import Partners from '@/components/Partners.vue'
import Questions from '@/components/Questions.vue'
type Tile = {
  id: number
  delay: string
  duration: string
}

const tiles = computed<Tile[]>(() =>
  Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    delay: `${i * 0.1}s`,
    duration: `${3 + (i % 3)}s`, // 3s, 4s, 5s
  })),
)
</script>

<template>
  <!-- FULL background -->
  <section class="relative w-full overflow-hidden bg-[#F3FAF7]">
    <!-- soft glow -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -left-48 top-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-25"
        style="
          background: radial-gradient(
            circle,
            rgba(16, 185, 129, 0.18) 0%,
            rgba(16, 185, 129, 0) 65%
          );
        "
      ></div>

      <div
        class="absolute -right-40 -top-32 h-[620px] w-[620px] rounded-full blur-3xl opacity-25"
        style="
          background: radial-gradient(
            circle,
            rgba(16, 185, 129, 0.22) 0%,
            rgba(16, 185, 129, 0) 68%
          );
        "
      ></div>
    </div>

    <!-- CONTENT -->
    <div class="container mx-auto px-4">
      <div class="grid items-center gap-10 py-24 lg:grid-cols-2 lg:py-32">
        <!-- LEFT -->
        <div>
          <h1
            class="text-[42px] max-w-[580px] font-bold leading-[1.05] text-slate-900 sm:text-[56px]"
          >
            Покупайте сейчас — платите частями
          </h1>

          <p class="mt-5 max-w-xl text-lg text-slate-600">
            Онлайн рассрочка без переплат и скрытых комиссий. Оформите за 5 минут!
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <button
              class="btn-fill-center group flex items-center rounded-xl px-6 py-3 text-base font-semibold"
            >
              <span class="relative z-10">Получить рассрочку</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ml-2 h-5 w-5 relative z-10 transition-all duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>

            <button class="btn-outline-center rounded-xl px-6 py-3 text-base font-semibold">
              <span class="relative z-10 inline-flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-play mr-2 h-5 w-5"
                  data-lp-id="components/Hero.tsx:35:16"
                  data-lp-name="Play"
                >
                  <polygon points="6 3 20 12 6 21 6 3"></polygon>
                </svg>
                Как это работает
              </span>
            </button>
          </div>

          <div class="mt-10 flex flex-wrap gap-10">
            <div>
              <div class="text-4xl font-extrabold text-emerald-600">0%</div>
              <div class="mt-1 text-slate-600">переплаты</div>
            </div>
            <div>
              <div class="text-4xl font-extrabold text-emerald-600">5 мин</div>
              <div class="mt-1 text-slate-600">оформление</div>
            </div>
            <div>
              <div class="text-4xl font-extrabold text-emerald-600">1000+</div>
              <div class="mt-1 text-slate-600">партнеров</div>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="relative hidden items-center justify-center lg:flex">
          <div class="relative">
            <div
              class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 blur-3xl opacity-20 animate-pulse"
            ></div>

            <div class="relative grid grid-cols-3 gap-4 p-8">
              <div
                v-for="t in tiles"
                :key="t.id"
                class="tile animate-float"
                :style="{ animationDelay: t.delay, animationDuration: t.duration }"
              >
                <div class="tile-inner"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- MOBILE -->
        <div class="lg:hidden">
          <div class="relative mx-auto max-w-[360px]">
            <div
              class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 blur-3xl opacity-15 animate-pulse"
            ></div>

            <div class="relative grid grid-cols-3 gap-3 p-5">
              <div
                v-for="t in tiles"
                :key="'m' + t.id"
                class="tile tile-sm animate-float"
                :style="{ animationDelay: t.delay, animationDuration: t.duration }"
              >
                <div class="tile-inner tile-inner-sm"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- /MOBILE -->
      </div>
    </div>
  </section>
  <Advantages />
  <Installment />
  <Partners />
  <Questions />
</template>

<style scoped>
/* OUTER tile: faqat float (translateY) */
.tile {
  will-change: transform;
}

@keyframes floatY {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-14px);
  }
}

.animate-float {
  animation-name: floatY;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* INNER tile: hover rotate(15deg) + scale */
.tile-inner {
  height: 96px;
  width: 96px;
  border-radius: 16px;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  box-shadow: 0 12px 22px rgba(2, 6, 23, 0.12);
  transition:
    transform 500ms ease,
    box-shadow 500ms ease,
    filter 500ms ease;
  transform-origin: center;
}

.tile:hover .tile-inner {
  transform: rotate(10deg) scale(1.1);
  box-shadow: 0 22px 45px rgba(2, 6, 23, 0.18);
  filter: saturate(1.05);
}

/* Mobile sizing */
.tile-sm .tile-inner-sm {
  height: 78px;
  width: 78px;
  border-radius: 16px;
}

/* ---------- Buttons: center-out fill ---------- */
.btn-fill-center {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: #059669;
  border: 1px solid rgba(5, 150, 105, 0.35);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
  box-shadow: 0 10px 22px rgba(5, 150, 105, 0.18);
}

.btn-fill-center::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #10b981, #34d399, #10b981);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 280ms ease;
}

.btn-fill-center:hover::before {
  transform: scaleX(1);
}

.btn-fill-center:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 30px rgba(5, 150, 105, 0.26);
}

.btn-outline-center {
  position: relative;
  overflow: hidden;
  color: #059669;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(5, 150, 105, 0.35);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.btn-outline-center::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(5, 150, 105, 0.1);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 280ms ease;
}

.btn-outline-center:hover::before {
  transform: scaleX(1);
}

.btn-outline-center:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(2, 6, 23, 0.08);
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-float {
    animation: none;
  }
  .btn-fill-center::before,
  .btn-outline-center::before {
    transition: none;
  }
}
</style>
