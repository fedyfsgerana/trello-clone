<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-black text-gray-800 flex items-center gap-2">
          <ClipboardDocumentListIcon class="w-6 h-6 text-indigo-500" />
          {{ isEdit ? "Edit Task" : "Task Baru" }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1.5"
            >Judul Task *</label
          >
          <div class="relative">
            <PencilSquareIcon
              class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            />
            <input
              v-model="form.title"
              type="text"
              placeholder="Apa yang perlu dikerjakan?"
              class="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1.5"
            >Deskripsi</label
          >
          <textarea
            v-model="form.description"
            placeholder="Detail lebih lanjut..."
            rows="3"
            class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition resize-none"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1"
            >
              <FlagIcon class="w-4 h-4 text-indigo-400" /> Prioritas
            </label>
            <select
              v-model="form.priority"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
          <div>
            <label
              class="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1"
            >
              <CalendarDaysIcon class="w-4 h-4 text-indigo-400" /> Due Date
            </label>
            <input
              v-model="form.due_date"
              type="date"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button
          @click="handleSave"
          class="flex-1 bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2.5 rounded-xl font-bold hover:opacity-90 transition shadow-md shadow-blue-200 flex items-center justify-center gap-2"
        >
          <CheckIcon class="w-4 h-4" /> Simpan
        </button>
        <button
          v-if="isEdit"
          @click="$emit('delete')"
          class="bg-red-50 text-red-500 px-4 py-2.5 rounded-xl font-bold hover:bg-red-100 transition border-2 border-red-100 flex items-center gap-1"
        >
          <TrashIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  XMarkIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  FlagIcon,
  CalendarDaysIcon,
  CheckIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({ task: Object, isEdit: Boolean });
const emit = defineEmits(["save", "delete", "close"]);

const form = ref({
  title: "",
  description: "",
  priority: "medium",
  due_date: "",
});

watch(
  () => props.task,
  (val) => {
    if (val)
      form.value = {
        title: val.title || "",
        description: val.description || "",
        priority: val.priority || "medium",
        due_date: val.due_date ? val.due_date.split("T")[0] : "",
      };
  },
  { immediate: true },
);

const handleSave = () => {
  if (!form.value.title) return;
  emit("save", { ...form.value });
};
</script>
