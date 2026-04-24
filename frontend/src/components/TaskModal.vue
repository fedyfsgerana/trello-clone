<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h3 class="text-lg font-bold text-gray-700 mb-4">
        {{ isEdit ? "Edit Task" : "Tambah Task" }}
      </h3>

      <div class="space-y-3">
        <div>
          <label class="text-sm font-medium text-gray-600">Judul</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Judul task"
            class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-600">Deskripsi</label>
          <textarea
            v-model="form.description"
            placeholder="Deskripsi task"
            rows="3"
            class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-600">Prioritas</label>
          <select
            v-model="form.priority"
            class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-600">Due Date</label>
          <input
            v-model="form.due_date"
            type="date"
            class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div class="flex gap-2 mt-6">
        <button
          @click="handleSave"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
        >
          Simpan
        </button>
        <button
          v-if="isEdit"
          @click="$emit('delete')"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Hapus
        </button>
        <button
          @click="$emit('close')"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  task: Object,
  isEdit: Boolean,
});

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
    if (val) {
      form.value = {
        title: val.title || "",
        description: val.description || "",
        priority: val.priority || "medium",
        due_date: val.due_date ? val.due_date.split("T")[0] : "",
      };
    }
  },
  { immediate: true },
);

const handleSave = () => {
  if (!form.value.title) return;
  emit("save", { ...form.value });
};
</script>
