<script setup lang="ts">
import router from '@/router'
import { Store, User } from 'lucide-vue-next'

function onSelect(type: string) {
  router.push({ path: type })
}
</script>

<template>
  <div class="min-h-screen relative overflow-hidden bg-[#EEF3FF]">
    <!-- soft background blobs -->
    <div
      class="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/60 blur-3xl"
    />
    <div
      class="pointer-events-none absolute -bottom-48 -right-48 h-[560px] w-[560px] rounded-full bg-white/50 blur-3xl"
    />

    <div class="min-h-screen flex items-center justify-center px-4 py-10">
      <div class="w-full max-w-[1120px]">
        <!-- Title -->
        <div class="text-center mb-10 md:mb-14">
          <h1 class="text-[32px] md:text-[44px] leading-tight font-extrabold text-[#0F172A]">
            Система рассрочки МФО
          </h1>
          <p class="mt-3 text-[15px] md:text-[18px] text-[#475569]">
            Выберите тип аккаунта для входа
          </p>
        </div>

        <!-- Cards -->
        <div class="grid md:grid-cols-2 gap-6 md:gap-8">
          <!-- Merchant -->
          <button @click="onSelect('/merchant')" class="group text-left">
            <div
              class="h-full rounded-[22px] bg-white/90 backdrop-blur border border-white/60 shadow-[0_18px_40px_rgba(2,6,23,0.10)] hover:shadow-[0_22px_55px_rgba(2,6,23,0.14)] transition-all duration-300 hover:-translate-y-1"
            >
              <div class="p-7 md:p-9">
                <div
                  class="w-[64px] h-[64px] rounded-[16px] bg-[#E0E7FF] flex items-center justify-center mb-6 ring-1 ring-black/5 group-hover:bg-[#D7E0FF] transition-colors"
                >
                  <Store class="w-8 h-8 text-[#4F46E5]" />
                </div>

                <h2 class="text-[22px] md:text-[26px] font-bold text-[#0F172A]">
                  Кабинет мерчанта
                </h2>

                <p class="mt-2 text-[14px] md:text-[15px] text-[#475569]">
                  Для партнерских магазинов и торговых точек
                </p>

                <ul class="mt-5 space-y-2 text-[13px] md:text-[14px] text-[#64748B]">
                  <li class="flex gap-2">
                    <span class="mt-[7px] h-[5px] w-[5px] rounded-full bg-[#94A3B8]" />
                    Управление сделками
                  </li>
                  <li class="flex gap-2">
                    <span class="mt-[7px] h-[5px] w-[5px] rounded-full bg-[#94A3B8]" />
                    Создание заявок на рассрочку
                  </li>
                  <li class="flex gap-2">
                    <span class="mt-[7px] h-[5px] w-[5px] rounded-full bg-[#94A3B8]" />
                    Мониторинг платежей
                  </li>
                </ul>
              </div>
            </div>
          </button>

          <!-- Client -->
          <button @click="onSelect('/client')" class="group text-left">
            <div
              class="h-full rounded-[22px] bg-white/90 backdrop-blur border border-white/60 shadow-[0_18px_40px_rgba(2,6,23,0.10)] hover:shadow-[0_22px_55px_rgba(2,6,23,0.14)] transition-all duration-300 hover:-translate-y-1"
            >
              <div class="p-7 md:p-9">
                <div
                  class="w-[64px] h-[64px] rounded-[16px] bg-[#D1FAE5] flex items-center justify-center mb-6 ring-1 ring-black/5 group-hover:bg-[#C7F7DE] transition-colors"
                >
                  <User class="w-8 h-8 text-[#059669]" />
                </div>

                <h2 class="text-[22px] md:text-[26px] font-bold text-[#0F172A]">Кабинет клиента</h2>

                <p class="mt-2 text-[14px] md:text-[15px] text-[#475569]">
                  Для физических лиц - покупателей
                </p>

                <ul class="mt-5 space-y-2 text-[13px] md:text-[14px] text-[#64748B]">
                  <li class="flex gap-2">
                    <span class="mt-[7px] h-[5px] w-[5px] rounded-full bg-[#94A3B8]" />
                    Оформление покупок в рассрочку
                  </li>
                  <li class="flex gap-2">
                    <span class="mt-[7px] h-[5px] w-[5px] rounded-full bg-[#94A3B8]" />
                    Управление лимитами
                  </li>
                  <li class="flex gap-2">
                    <span class="mt-[7px] h-[5px] w-[5px] rounded-full bg-[#94A3B8]" />
                    График погашения
                  </li>
                </ul>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
