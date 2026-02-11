<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { Phone } from 'lucide-vue-next'

type Model = string

const props = defineProps<{
  modelValue: Model
  label?: string
  disabled?: boolean
  /** tashqaridan error berilsa ko'rsatadi */
  error?: string
  /** ichki validatsiya yoqilsinmi (default true) */
  validate?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: Model): void
  (e: 'update:valid', v: boolean): void
  (e: 'blur'): void
  (e: 'focus'): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const prefix = '+998'

/**
 * 9 ta digit: (XX) (YYY) (YY) (YY)
 * masalan: 90 017 68 77 => "900176877"
 */
const digits = ref<string>('')

const internalError = ref<string>('')

function onlyDigits(s: string) {
  return (s || '').replace(/\D+/g, '')
}

function trimFromAnyValue(v: string) {
  const d = onlyDigits(v)
  return d.startsWith('998') ? d.slice(3) : d
}

function takeMax(s: string, n: number) {
  return s.slice(0, n)
}

function formatUZ(d: string) {
  const a = d.slice(0, 2)
  const b = d.slice(2, 5)
  const c = d.slice(5, 7)
  const e = d.slice(7, 9)
  return [a, b, c, e].filter(Boolean).join(' ')
}

const formatted = computed(() => formatUZ(digits.value))

const displayValue = computed(() => {
  // doim prefix
  return formatted.value ? `${prefix} ${formatted.value}` : `${prefix}`
})

function setCaretToEnd() {
  const el = inputRef.value
  if (!el) return
  const len = el.value.length
  el.setSelectionRange(len, len)
}

function emitModel() {
  emit('update:modelValue', `${prefix}${digits.value}`)
}

/** Ichki validatsiya */
function validateNow() {
  if (props.validate === false) {
    internalError.value = ''
    emit('update:valid', true)
    return
  }

  // bo'sh bo'lsa ham xato chiqarmay turish (xohlasang chiqaramiz)
  if (!digits.value.length) {
    internalError.value = ''
    emit('update:valid', false)
    return
  }

  if (digits.value.length < 9) {
    internalError.value = 'Номер телефона введён не полностью'
    emit('update:valid', false)
    return
  }

  // XX: 90-99 bo'lsin (umumiy)
  const op = Number(digits.value.slice(0, 2))
  if (Number.isNaN(op) || op < 90 || op > 99) {
    internalError.value = 'Некорректный код оператора'
    emit('update:valid', false)
    return
  }

  internalError.value = ''
  emit('update:valid', true)
}

/** modelValue dan ichkariga sync */
watch(
  () => props.modelValue,
  (v) => {
    const trimmed = takeMax(trimFromAnyValue(v), 9)
    digits.value = trimmed
    validateNow()
    // value set bo'lgandan keyin caret oxirda turishi uchun
    nextTick(() => setCaretToEnd())
  },
  { immediate: true },
)

/** inputga kiritilayotgan narsani real bloklash (harf/paste) */
function onBeforeInput(e: InputEvent) {
  if (props.disabled) return

  // delete/backspace/undo kabi control’larni qo'yamiz
  if (!e.data) return

  // faqat raqam ruxsat
  if (!/^\d+$/.test(e.data)) {
    e.preventDefault()
    return
  }

  // max 9 digit
  if (digits.value.length >= 9) {
    e.preventDefault()
  }
}

/** paste’ni ham tozalab, 9 digit bilan cheklaymiz */
function onPaste(e: ClipboardEvent) {
  if (props.disabled) return
  e.preventDefault()

  const text = e.clipboardData?.getData('text') ?? ''
  const incoming = trimFromAnyValue(text)
  const merged = takeMax(digits.value + incoming, 9)

  digits.value = merged
  emitModel()
  validateNow()

  nextTick(() => setCaretToEnd())
}

/** oddiy input handler (fallback) */
function onInput(e: Event) {
  const el = e.target as HTMLInputElement

  // displayValue ichida +998 bor — shuni chiqarib digits qabul qilamiz
  const raw = trimFromAnyValue(el.value)
  digits.value = takeMax(raw, 9)

  emitModel()
  validateNow()

  // format sabab caret buzilmasin — oxirga olib boramiz
  nextTick(() => setCaretToEnd())
}

function onKeydown(e: KeyboardEvent) {
  // prefixni o'chirishni bloklash
  const el = e.target as HTMLInputElement
  if (!el.selectionStart) return

  // cursor prefix ichida bo'lsa, backspace ishlamasin
  if (e.key === 'Backspace' && el.selectionStart <= prefix.length) {
    e.preventDefault()
  }
}

function onFocus() {
  emit('focus')
  nextTick(() => setCaretToEnd())
}

function onBlur() {
  emit('blur')
  validateNow()
}

const shownError = computed(() => props.error || internalError.value)
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-semibold text-slate-800 mb-2">
      {{ label }}
    </label>

    <div
      class="relative rounded-[14px] bg-white shadow-sm transition border"
      :class="[
        disabled ? 'opacity-60 pointer-events-none' : '',
        shownError
          ? 'border-rose-400 ring-4 ring-rose-500/10'
          : 'border-slate-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/15',
      ]"
    >
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pr-3">
        <Phone class="w-5 h-5 text-slate-400" />
      </div>

      <input
        ref="inputRef"
        :disabled="disabled"
        inputmode="numeric"
        autocomplete="tel"
        class="w-full h-[52px] rounded-[14px] outline-none text-slate-800 placeholder:text-slate-400 pr-4 pl-[42px]"
        :value="displayValue"
        :placeholder="`${prefix} 90 000 00 00`"
        @beforeinput="onBeforeInput"
        @paste="onPaste"
        @input="onInput"
        @keydown="onKeydown"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>

    <p v-if="shownError" class="mt-2 text-sm text-rose-600">
      {{ shownError }}
    </p>
  </div>
</template>
