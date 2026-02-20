<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowLeft, Store, Lock, User, Check } from 'lucide-vue-next'
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
const isValid = ref(false)

// 🔐 Custom CAPTCHA
const captchaChecked = ref(false)
const captchaAnimating = ref(false)

function toggleCaptcha() {
  if (captchaAnimating.value) return
  captchaAnimating.value = true
  setTimeout(() => {
    captchaChecked.value = true
    captchaAnimating.value = false
  }, 600)
}

function resetCaptcha() {
  captchaChecked.value = false
  captchaAnimating.value = false
}

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

  if (!captchaChecked.value) {
    error.value = 'Пожалуйста подтвердите, что вы не робот'
    return
  }

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
  resetCaptcha()
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

        <!-- Tabs -->
        <div class="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-full">
          <button
            type="button"
            @click="loginMethod = 'phone'"
            class="w-1/2 py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
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
            class="w-1/2 py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
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
          <!-- Phone tab -->
          <template v-if="loginMethod === 'phone'">
            <PhoneInput
              v-model="phone"
              @update:valid="(v) => (isValid = v)"
              label="Номер телефона"
            />
          </template>

          <!-- Credentials tab -->
          <template v-else>
            <BaseInput v-model="username" label="Логин" placeholder="Введите логин" clearable>
              <template #leftIcon>
                <User class="w-5 h-5 text-slate-400" />
              </template>
            </BaseInput>

            <BaseInput
              v-model="password"
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
              clearable
            >
              <template #leftIcon>
                <Lock class="w-5 h-5 text-slate-400" />
              </template>
            </BaseInput>
          </template>

          <!-- ✅ Custom Inline CAPTCHA -->
          <div
            class="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50 select-none"
            :class="captchaChecked ? 'border-green-300 bg-green-50' : 'border-gray-200'"
          >
            <!-- Left: checkbox + label -->
            <div class="flex items-center gap-3">
              <button
                type="button"
                @click="toggleCaptcha"
                class="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                :class="
                  captchaChecked
                    ? 'bg-green-500 border-green-500'
                    : captchaAnimating
                      ? 'border-indigo-400 bg-indigo-50 animate-pulse'
                      : 'border-gray-400 bg-white hover:border-indigo-400'
                "
                :disabled="captchaAnimating"
              >
                <Check v-if="captchaChecked" class="w-4 h-4 text-white" style="stroke-width: 3" />
                <!-- Loading spinner -->
                <svg
                  v-else-if="captchaAnimating"
                  class="w-3 h-3 text-indigo-500 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                  class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              </button>

              <span class="text-sm text-gray-700 font-medium">Я не робот</span>
            </div>

            <!-- Right: reCAPTCHA branding style -->
            <div class="flex flex-col items-center gap-0.5 opacity-60">
              <div class="flex gap-0.5">
                <div
                  class="w-2 h-2 rounded-sm"
                  :class="captchaChecked ? 'bg-green-500' : 'bg-indigo-400'"
                />
                <div
                  class="w-2 h-2 rounded-sm"
                  :class="captchaChecked ? 'bg-green-400' : 'bg-indigo-300'"
                />
                <div
                  class="w-2 h-2 rounded-sm"
                  :class="captchaChecked ? 'bg-green-300' : 'bg-indigo-200'"
                />
              </div>
              <span class="text-[9px] text-gray-400 tracking-wide">CAPTCHA</span>
            </div>
          </div>

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

        <!-- Demo -->
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
