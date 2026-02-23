<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowLeft, Store, Lock, User } from 'lucide-vue-next'
import router from '@/router'
import PhoneInput from '@/components/OtpPhoneNumber.vue'
import BaseInput from '@/components/BaseInput.vue'
import useAuth from '@/stores/login'
const authPinia = useAuth()
const phone = ref('')
const password = ref('')
const error = ref('')
const isValid = ref(false)

const V3_SITE_KEY = '6Ld_D3UsAAAAAO3q9IPmJGlx4iWM3qL4xdtZHlMf'

async function handleSubmit(e: Event) {
  e.preventDefault()
  error.value = ''

  try {
    const token = await (window as any).grecaptcha.execute(V3_SITE_KEY, {
      action: 'login',
    })

    await authPinia.getLogin({
      password: password.value,
      phone: phone.value,
      type: 'MERCHANT',
      captcha: token,
    })

    router.push('/dashboard')
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Неверный логин или пароль'
  }
}

onMounted(() => {
  // Script dinamik yuklash
  const script = document.createElement('script')
  script.src = `https://www.google.com/recaptcha/api.js?render=6Ld_D3UsAAAAAO3q9IPmJGlx4iWM3qL4xdtZHlMf`
  script.async = true
  script.defer = true
  document.head.appendChild(script)
})

onUnmounted(() => {
  // Sahifadan chiqqanda badge va skriptni o'chirish
  const script = document.querySelector('script[src*="recaptcha"]')
  if (script) script.remove()

  const badge = document.querySelector('.grecaptcha-badge')
  if (badge) badge.remove()

  // grecaptcha obyektini tozalash
  delete (window as any).grecaptcha
})
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

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <PhoneInput v-model="phone" @update:valid="(v) => (isValid = v)" label="Номер телефона" />

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

          <!-- V3 da UI element kerak emas, background da ishlaydi -->

          <div
            v-if="error"
            class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="authPinia.loadingLogin"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg
              v-if="authPinia.loadingLogin"
              class="w-4 h-4 animate-spin"
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
            {{ authPinia.loadingLogin ? 'Загрузка...' : 'Войти' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
