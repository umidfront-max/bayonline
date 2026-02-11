<script setup lang="ts">
import { computed } from 'vue'

type Partner = {
  name: string
  icon: string // emoji yoki icon
}

const partners = computed<Partner[]>(() => [
  { name: 'Technomart', icon: 'https://texnomart.uz/_nuxt/img/texnomart-logo.3b2791c.svg' },
  {
    name: 'Samsung',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Samsung_old_logo_before_year_2015.svg/1280px-Samsung_old_logo_before_year_2015.svg.png',
  },
  { name: 'LG', icon: 'https://www.lg.com/lg5-common-gp/images/common/header/logo-b2c.jpg' },
  { name: 'Artel', icon: 'https://artelelectronics.com/icons/logos/Artel_logo_green_UZ.svg' },
  {
    name: 'Tefal',
    icon: 'https://www.tefal.co.uk/medias/logo.png?context=bWFzdGVyfHJvb3R8MjE5MnxpbWFnZS9wbmd8YUdZM0wyZzBZUzh4TXpBNU1EUTROelF6TlRJNU5DNXdibWN8NDI3NmRlZDMxNGQ5MjI4MTk2YTdjMWJjNDdiYWY3YjRiNTdiZjUzOTM3NGMxNmViOWEwNGEwMDI2ZmY0NWMwMQ',
  },
  { name: 'Bosch', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Bosch_logo.png' },
  {
    name: 'Philips',
    icon: 'https://1000logos.net/wp-content/uploads/2017/05/Phillips-Logo-2008.png',
  },
  { name: 'Sony', icon: 'https://1000logos.net/wp-content/uploads/2017/06/Sony-Logo.jpg' },
])
</script>

<template>
  <section id="partners" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Наши партнеры</h2>
        <p class="text-lg text-slate-600">Более 1000+ магазинов по всему Узбекистану</p>
      </div>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
        <div
          v-for="p in partners"
          :key="p.name"
          class="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg hover:-translate-y-1"
        >
          <div class="text-5xl mb-3">
            <img class="h-20" :src="p.icon" alt="" />
          </div>
          <div class="text-sm font-medium text-slate-700">
            {{ p.name }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
