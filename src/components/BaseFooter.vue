<script setup lang="ts">
const companyLinks = [
  { label: 'О сервисе', href: '#about' },
  { label: 'Как это работает', href: '#how-it-works' },
  { label: 'Партнеры', href: '#partners' },
]

const legalLinks = [
  { label: 'Политика конфиденциальности', href: '#' },
  { label: 'Условия использования', href: '#' },
  { label: 'FAQ', href: '#faq' },
]
</script>

<template>
  <footer id="contact" class="bg-slate-900 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
              <span class="text-xl font-bold">B</span>
            </div>
            <span class="text-2xl font-bold">BAY</span>
          </div>

          <p class="text-slate-400">Современный сервис онлайн рассрочки для покупок без переплат</p>
        </div>

        <!-- About -->
        <div>
          <h3 class="font-semibold mb-4">О компании</h3>
          <ul class="space-y-2 text-slate-400">
            <li v-for="l in companyLinks" :key="l.label">
              <a :href="l.href" class="hover:text-emerald-400 transition-colors">
                {{ l.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="font-semibold mb-4">Правовая информация</h3>
          <ul class="space-y-2 text-slate-400">
            <li v-for="l in legalLinks" :key="l.label">
              <a :href="l.href" class="hover:text-emerald-400 transition-colors">
                {{ l.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="font-semibold mb-4">Поддержка</h3>
          <ul class="space-y-3 text-slate-400">
            <li class="flex items-center gap-2">
              <!-- phone -->
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
                class="h-4 w-4"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>

              <a href="tel:+998712345678" class="hover:text-emerald-400 transition-colors">
                +998 71 234 56 78
              </a>
            </li>

            <li class="flex items-center gap-2">
              <!-- mail -->
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
                class="h-4 w-4"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>

              <a href="mailto:info@bay.uz" class="hover:text-emerald-400 transition-colors">
                info@bay.uz
              </a>
            </li>

            <li class="flex items-start gap-2">
              <!-- map -->
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
                class="h-4 w-4 mt-1"
              >
                <path
                  d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                />
                <circle cx="12" cy="10" r="3" />
              </svg>

              <span>Tashkent, Uzbekistan</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- bottom -->
      <div class="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400">
        <p>© 2024 BAY. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>
