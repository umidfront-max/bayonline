<template>
  <section class="min-h-screen bg-black p-8 text-white">
    <div  class="flex gap-8 items-center cursor-pointer">
      <div @click="router.push('/')" class="flex gap-3 bg-[#445] px-3 py-1 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <p>Bosh sahifaga</p>
      </div>
      <router-link class="bg-[#445] px-3 py-1 rounded-lg" to="/dashboard">Vakansiya</router-link>
    </div>
    <h2 class="text-3xl font-bold my-8 text-center">🧑‍💼 Vakansiyalarni boshqarish</h2>

    <!-- Form -->
    <form
      @submit.prevent="saveVacancy"
      class="bg-gray-900 shadow rounded-xl p-6 mb-10 space-y-4 max-w-3xl mx-auto"
    >
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="text-sm text-gray-300">Lavozim nomi</label>
          <input
            v-model="form.title"
            type="text"
            class="input bg-gray-800 text-white border-gray-700"
            placeholder="Frontend dasturchi"
            required
          />
        </div>
        <div>
          <label class="text-sm text-gray-300">Ish vaqti</label>
          <input
            v-model="form.time"
            type="text"
            class="input bg-gray-800 text-white border-gray-700"
            placeholder="To‘liq stavka"
          />
        </div>
        <div>
          <label class="text-sm text-gray-300">Maosh</label>
          <input
            v-model="form.salary"
            type="text"
            class="input bg-gray-800 text-white border-gray-700"
            placeholder="7 000 000 so‘m"
          />
        </div>
        <div>
          <label class="text-sm text-gray-300">Manzil</label>
          <input
            v-model="form.location"
            type="text"
            class="input bg-gray-800 text-white border-gray-700"
            placeholder="Buxoro, BuxDPI"
          />
        </div>
        <div class="md:col-span-2">
          <label class="text-sm text-gray-300">Talim muassasasi yoki bo‘lim</label>
          <input
            v-model="form.degree"
            type="text"
            class="input bg-gray-800 text-white border-gray-700"
            placeholder="Axborot texnologiyalari fakulteti"
          />
        </div>
        <div class="md:col-span-2">
          <label class="text-sm text-gray-300">Tavsif</label>
          <textarea
            v-model="form.description"
            class="input bg-gray-800 text-white border-gray-700"
            rows="3"
            placeholder="Ish tavsifi..."
          ></textarea>
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <button type="submit" class="btn-primary bg-blue-600 hover:bg-blue-700">
          {{ editId ? 'Saqlash' : 'Qo‘shish' }}
        </button>
        <button
          v-if="editId"
          @click="cancelEdit"
          type="button"
          class="btn-secondary bg-gray-600 hover:bg-gray-500 text-white"
        >
          Bekor qilish
        </button>
      </div>
    </form>

    <!-- Table -->
    <div class="overflow-x-auto bg-gray-900 rounded-xl shadow max-w-5xl mx-auto">
      <table class="w-full text-sm text-gray-300">
        <thead class="bg-gray-800 text-gray-100 uppercase text-xs">
          <tr>
            <th class="p-3 text-left">#</th>
            <th class="p-3 text-left">Lavozim</th>
            <th class="p-3 text-left">Maosh</th>
            <th class="p-3 text-left">Manzil</th>
            <th class="p-3 text-left">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(v, i) in vacancies"
            :key="v.id"
            class="border-b border-gray-700 hover:bg-gray-800"
          >
            <td class="p-3">{{ i + 1 }}</td>
            <td class="p-3 font-medium">{{ v.title }}</td>
            <td class="p-3">{{ v.salary }}</td>
            <td class="p-3">{{ v.location }}</td>
            <td class="p-3 flex gap-2">
              <button @click="editVacancy(v)" class="text-blue-400 hover:underline">✏️ Edit</button>
              <button @click="deleteVacancy(v.id)" class="text-red-400 hover:underline">
                🗑 O‘chirish
              </button>
            </td>
          </tr>
          <tr v-if="vacancies.length === 0">
            <td colspan="5" class="text-center p-4 text-gray-500">
              Hozircha hech qanday vakansiya yo‘q 😴
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref, onMounted, watch } from 'vue'

const defaultVacancies = [
  {
    id: 1,
    title: 'Frontend dasturchi',
    description:
      'Universitetning rasmiy veb-portalini rivojlantirish va texnik qo‘llab-quvvatlash.',
    time: 'To‘liq stavka (09:00 - 18:00)',
    salary: '7 000 000 - 10 000 000 so‘m',
    location: 'Buxoro, BuxDPI binosi',
    degree: 'Axborot texnologiyalari fakulteti',
  },
  {
    id: 2,
    title: 'Matematika o‘qituvchisi',
    description: 'Talabalarga oliy matematika fanidan dars berish va ilmiy ishlarni boshqarish.',
    time: 'Yarim stavka',
    salary: '5 000 000 - 7 000 000 so‘m',
    location: 'Buxoro, 2-bino',
    degree: 'Matematika va informatika kafedrasi',
  },
  {
    id: 3,
    title: 'Labarant (kompyuter sinfida)',
    description: 'Kompyuter sinflarini texnik holatda saqlash, talabalar uchun yordam ko‘rsatish.',
    time: 'To‘liq stavka',
    salary: '4 500 000 - 6 000 000 so‘m',
    location: 'Buxoro, Bosh binoning 1-qavati',
    degree: 'Axborot markazi',
  },
]

const vacancies = ref<any[]>([])
const form = ref({
  title: '',
  description: '',
  time: '',
  salary: '',
  location: '',
  degree: '',
})
const editId = ref<number | null>(null)

// LocalStorage dan o‘qish
onMounted(() => {
  const saved = localStorage.getItem('vacancies')
  vacancies.value = saved ? JSON.parse(saved) : defaultVacancies
})

// LocalStorage ga yozish
watch(
  vacancies,
  (val) => {
    localStorage.setItem('vacancies', JSON.stringify(val))
  },
  { deep: true },
)

// Qo‘shish yoki tahrirlash
const saveVacancy = () => {
  if (!form.value.title) return alert('Iltimos, lavozim nomini kiriting!')

  if (editId.value) {
    const idx = vacancies.value.findIndex((v) => v.id === editId.value)
    if (idx !== -1) vacancies.value[idx] = { id: editId.value, ...form.value }
    editId.value = null
  } else {
    vacancies.value.push({ id: Date.now(), ...form.value })
  }

  clearForm()
}

// O‘chirish
const deleteVacancy = (id: number) => {
  if (confirm('Rostdan o‘chirmoqchimisiz?')) {
    vacancies.value = vacancies.value.filter((v) => v.id !== id)
  }
}

// Tahrirlash
const editVacancy = (v: any) => {
  form.value = { ...v }
  editId.value = v.id
}

// Bekor qilish
const cancelEdit = () => {
  clearForm()
  editId.value = null
}

// Formani tozalash
const clearForm = () => {
  form.value = { title: '', description: '', time: '', salary: '', location: '', degree: '' }
}
</script>

<style scoped>
.router-link-active {
  border: 1px white dashed;
}
</style>
