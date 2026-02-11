<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string // text | password | email | number...
  disabled?: boolean
  error?: string
   hint?: string
  
  name?: string
  autocomplete?: string
  inputmode?: string // "numeric" | "email" | ...
  maxlength?: number

  /** clear icon ko'rsatilsinmi */
  clearable?: boolean

  /** input height (default 52px) */
  heightClass?: string // masalan "h-[46px]"
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'enter'): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const type = computed(() => props.type ?? 'text')
const hClass = computed(() => props.heightClass ?? 'h-[52px]')

const valueStr = computed({
  get: () => String(props.modelValue ?? ''),
  set: (v: string) => emit('update:modelValue', v),
})

const hasValue = computed(() => valueStr.value.length > 0)
const shownError = computed(() => props.error || '')

function onInput(e: Event) {
  const el = e.target as HTMLInputElement
  valueStr.value = el.value
}

function clear() {
  if (props.disabled) return
  valueStr.value = ''
  // focus qaytarib qo'yamiz
  requestAnimationFrame(() => inputRef.value?.focus())
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') emit('enter')
}
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
      <!-- Left icon slot -->
      <div v-if="$slots.leftIcon" class="absolute inset-y-0 left-0 flex items-center pl-4 pr-3">
        <slot name="leftIcon" />
      </div>

      <input
        ref="inputRef"
        :disabled="disabled"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :value="valueStr"
        @input="onInput"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @keydown="onKeydown"
        class="w-full rounded-[14px] outline-none text-slate-800 placeholder:text-slate-400 pr-4"
        :class="[
          hClass,
          $slots.leftIcon ? 'pl-[46px]' : 'pl-4',
          clearable && hasValue ? 'pr-[44px]' : '',
        ]"
      />

      <!-- Clear button -->
      <button
        v-if="clearable && hasValue"
        type="button"
        @click="clear"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center transition"
        aria-label="Clear"
      >
        <X class="w-4 h-4 text-slate-500" />
      </button>
    </div>

    <p v-if="shownError" class="mt-2 text-sm text-rose-600">
      {{ shownError }}
    </p>
    <p v-else-if="hint" class="mt-2 text-sm text-slate-500">
      {{ hint }}
    </p>
  </div>
</template>
