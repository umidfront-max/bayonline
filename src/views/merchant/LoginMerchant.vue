<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Store, Phone, Lock, User } from 'lucide-vue-next'
import router from '@/router'
import PhoneInput from '@/components/OtpPhoneNumber.vue'
import BaseInput from '@/components/BaseInput.vue'

type LoginMethod = 'phone' | 'credentials'

const props = defineProps<{
  onLogin: (merchant: any) => void
  onBack: () => void
}>()

const loginMethod = ref<LoginMethod>('phone')
const phone = ref('')
const username = ref('')
const password = ref('')
const error = ref('')

const demoMerchants = [
  {
    id: 'm1',
    name: 'Магазин Электроники',
    phone: '+7 900 123 45 67',
    username: 'electroshop',
    password: 'demo123',
    balance: 450000,
  },
  {
    id: 'm2',
    name: 'Мебельный Центр',
    phone: '+7 900 765 43 21',
    username: 'furniture',
    password: 'demo123',
    balance: 680000,
  },
] as const

function handleSubmit(e: Event) {
  e.preventDefault()
  error.value = ''

  let merchant: any | undefined

  if (loginMethod.value === 'phone') {
    merchant = demoMerchants.find((m) => m.phone === phone.value)
    if (!merchant) {
      error.value = 'Мерчант с таким номером не найден'
      return
    }
  } else {
    merchant = demoMerchants.find(
      (m) => m.username === username.value && m.password === password.value,
    )
    if (!merchant) {
      error.value = 'Неверный логин или пароль'
      return
    }
  }

  props.onLogin(merchant)
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4"
  >
    <div class="max-w-md w-full">
      <button
        type="button"
        @click="router.push('/account')"
        class="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        Назад
      </button>

      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div
          class="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-6"
        >
          <Store class="w-8 h-8 text-indigo-600" />
        </div>

        <h2 class="text-2xl font-bold text-center text-gray-900 mb-2">Вход для мерчанта</h2>
        <p class="text-center text-gray-600 mb-8">Войдите в кабинет партнера</p>

        <!-- Login Method Tabs -->
        <div class="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            @click="loginMethod = 'phone'"
            class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
            :class="
              loginMethod === 'phone'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            По телефону
          </button>

          <button
            type="button"
            @click="loginMethod = 'credentials'"
            class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
            :class="
              loginMethod === 'credentials'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            Логин/Пароль
          </button>
        </div>

        <form @submit="handleSubmit" class="space-y-4">
          <template v-if="loginMethod === 'phone'">
            <PhoneInput
              v-model="phone"
              @update:valid="(v) => (isValid = v)"
              label="Номер телефона"
            />
          </template>

          <template v-else>
            <BaseInput v-model="username" label="Логин" placeholder="Введите логин" clearable>
              <template #leftIcon>
                <User class="w-5 h-5 text-slate-400" />
              </template>
            </BaseInput>
            <BaseInput v-model="password" label="Пароль" placeholder="Введите пароль" clearable>
              <template #leftIcon>
                <Lock class="w-5 h-5 text-slate-400" />
              </template>
            </BaseInput>
          </template>

          <div
            v-if="error"
            class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {{ error }}
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Войти
          </button>
        </form>

        <!-- Demo credentials -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-xs font-medium text-gray-700 mb-2">Демо-данные:</p>
          <div class="text-xs text-gray-600 space-y-1">
            <p>Телефон: +7 900 123 45 67</p>
            <p>Или: electroshop / demo123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
