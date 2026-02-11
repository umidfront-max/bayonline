<script setup lang="ts">
import { ref } from "vue";

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "Что такое BAY?",
    a: "BAY - это современный сервис онлайн рассрочки, который позволяет покупать товары частями без переплат и скрытых комиссий.",
  },
  {
    q: "Есть ли переплата?",
    a: "Нет. При соблюдении условий рассрочки переплат нет — вы платите только стоимость товара.",
  },
  {
    q: "Какие документы нужны?",
    a: "Как правило, нужен паспорт и базовые данные для заявки. Точный список может зависеть от партнера.",
  },
  {
    q: "На какой срок можно оформить рассрочку?",
    a: "Срок рассрочки обычно от 3 до 12 месяцев — зависит от товара и условий партнера.",
  },
  {
    q: "Что если я захочу погасить досрочно?",
    a: "Досрочное погашение возможно. Условия зависят от договора и партнера, но обычно это можно сделать без проблем.",
  },
];

const openIndex = ref<number | null>(0);

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i;
}

/** Transition hooks (smooth open/close) */
function enter(el: Element) {
  const e = el as HTMLElement;
  e.style.height = "0px";
  e.style.opacity = "0";
  e.style.overflow = "hidden";
  e.style.transition = "height 220ms ease-out, opacity 220ms ease-out";

  requestAnimationFrame(() => {
    e.style.height = e.scrollHeight + "px";
    e.style.opacity = "1";
  });
}

function afterEnter(el: Element) {
  const e = el as HTMLElement;
  e.style.height = "auto";
  e.style.overflow = "visible";
  e.style.transition = "";
}

function leave(el: Element) {
  const e = el as HTMLElement;
  e.style.height = e.scrollHeight + "px";
  e.style.opacity = "1";
  e.style.overflow = "hidden";
  e.style.transition = "height 200ms ease-in, opacity 200ms ease-in";

  requestAnimationFrame(() => {
    e.style.height = "0px";
    e.style.opacity = "0";
  });
}
</script>

<template>
  <section id="faq" class="py-20 bg-slate-50">
    <div class="container mx-auto px-4 max-w-3xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
          Часто задаваемые вопросы
        </h2>
      </div>

      <div class="space-y-4">
        <div
          v-for="(item, i) in faqs"
          :key="item.q"
          class="bg-white border border-slate-200 rounded-lg px-6"
        >
          <h3 class="flex">
            <button
              type="button"
              class="flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-sm transition-all outline-none
                     hover:underline text-left font-semibold text-slate-900 hover:text-emerald-600"
              :aria-expanded="openIndex === i"
              @click="toggle(i)"
            >
              <span>{{ item.q }}</span>

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
                class="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 text-slate-500"
                :class="openIndex === i ? 'rotate-180' : 'rotate-0'"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </h3>

          <!-- Smooth open/close -->
          <Transition @enter="enter" @after-enter="afterEnter" @leave="leave">
            <div v-show="openIndex === i" class="text-sm">
              <div class="pt-0 pb-4 text-slate-600">
                {{ item.a }}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
