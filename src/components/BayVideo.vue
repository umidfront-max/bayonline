<template>
  <section class="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-15">
    <div
      class="w-full max-w-4xl rounded-2xl p-12 flex gap-14 items-center shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
      style="background: linear-gradient(135deg, #1a2035 0%, #1e2840 60%, #1a2035 100%)"
    >
      <!-- Left Content -->
      <div class="flex-1">
        <h2 class="text-[1.7rem] font-extrabold text-white leading-snug tracking-tight mb-3">
          Почему партнеры выбирают BAY
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed mb-7 font-normal">
          Узнайте, как сотрудничество с BAY помогает бизнесу расти и развиваться
        </p>

        <ul class="flex flex-col gap-4 list-none p-0 m-0">
          <li
            v-for="(feature, index) in features"
            :key="index"
            class="flex items-center gap-3 text-slate-300 text-[0.95rem] font-medium"
          >
            <span class="w-5 h-5 flex-shrink-0 flex items-center justify-center">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-full"
              >
                <path
                  d="M3 8L6.5 11.5L13 5"
                  stroke="#4ade80"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- Right: Video Thumbnail -->
      <div class="flex-shrink-0 w-[280px]">
        <div
          class="bg-gray-900 rounded-2xl w-full aspect-video flex flex-col items-center justify-center cursor-pointer relative overflow-hidden border border-white/5 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] group"
          @click="openModal"
        >
          <div
            class="w-13 h-13 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:bg-white/25 group-hover:scale-110"
          >
            <svg
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 ml-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p class="text-slate-500 text-xs font-medium tracking-wide m-0">Видео о партнерстве</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-250 ease-in-out"
        leave-active-class="transition-opacity duration-250 ease-in-out"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-5"
          @click.self="closeModal"
        >
          <div class="relative w-full max-w-[860px]">
            <!-- Close Button -->
            <button
              class="absolute -top-11 right-0 bg-white/10 hover:bg-white/20 border-none rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-colors duration-200 p-0"
              @click="closeModal"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
              >
                <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" />
              </svg>
            </button>

            <!-- iframe -->
            <div class="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden bg-black">
              <iframe
                v-if="isModalOpen"
                :src="youtubeEmbedUrl"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const youtubeVideoId = ref('xwg9Lf5ruUE')

const youtubeEmbedUrl = computed(
  () => `https://www.youtube.com/embed/${youtubeVideoId.value}?autoplay=1`,
)

const isModalOpen = ref(false)

const features = [
  'Моментальные выплаты партнерам',
  'Полная техническая поддержка 24/7',
  'Маркетинговая поддержка и продвижение',
  'Аналитика и отчетность в реальном времени',
]

function openModal() {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
}
</script>
