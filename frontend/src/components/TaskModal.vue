<template>
  <div
    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in overflow-hidden"
    >
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-slate-100"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center"
            :class="isEdit ? 'bg-slate-100' : 'bg-blue-50'"
          >
            <SquarePen v-if="isEdit" class="w-5 h-5 text-slate-600" />
            <PlusCircle v-else class="w-5 h-5 text-blue-600" />
          </div>
          <h3 class="font-extrabold text-slate-800 text-lg">
            {{ isEdit ? "Edit Task" : "Task Baru" }}
          </h3>
        </div>
        <button
          @click="$emit('close')"
          class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-6 space-y-4">
        <div>
          <label
            class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5"
            >Judul Task *</label
          >
          <input
            v-model="form.title"
            type="text"
            placeholder="Apa yang perlu dikerjakan?"
            class="input"
          />
        </div>
        <div>
          <label
            class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5"
            >Deskripsi</label
          >
          <textarea
            v-model="form.description"
            placeholder="Tambahkan detail atau catatan..."
            rows="3"
            class="input resize-none"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5"
              >Prioritas</label
            >
            <div class="flex flex-col gap-1.5">
              <label
                v-for="p in priorities"
                :key="p.value"
                class="flex items-center gap-2.5 p-2.5 rounded-xl border-2 cursor-pointer transition-all"
                :class="
                  form.priority === p.value
                    ? p.activeClass
                    : 'border-slate-100 hover:border-slate-200'
                "
              >
                <input
                  type="radio"
                  v-model="form.priority"
                  :value="p.value"
                  class="hidden"
                />
                <span
                  class="w-2 h-2 rounded-full flex-shrink-0"
                  :class="p.dot"
                ></span>
                <span
                  class="text-sm font-semibold"
                  :class="
                    form.priority === p.value ? p.textActive : 'text-slate-600'
                  "
                  >{{ p.label }}</span
                >
              </label>
            </div>
          </div>
          <div>
            <label
              class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5"
              >Due Date</label
            >
            <input v-model="form.due_date" type="date" class="input" />
            <p class="text-xs text-slate-400 mt-1.5">Batas pengerjaan task</p>
          </div>
        </div>
      </div>

      <div
        class="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100 gap-3"
      >
        <button v-if="isEdit" @click="$emit('delete')" class="btn-danger">
          <Trash2 class="w-4 h-4" /> Hapus
        </button>
        <div class="flex gap-2 ml-auto">
          <button @click="$emit('close')" class="btn-secondary">Batal</button>
          <button @click="handleSave" class="btn-primary">
            <Check class="w-4 h-4" /> Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { SquarePen, PlusCircle, X, Trash2, Check } from "lucide-vue-next";

const props = defineProps({ task: Object, isEdit: Boolean });
const emit = defineEmits(["save", "delete", "close"]);

const form = ref({
  title: "",
  description: "",
  priority: "medium",
  due_date: "",
});
const priorities = [
  {
    value: "high",
    label: "Tinggi",
    dot: "bg-red-500",
    activeClass: "border-red-200 bg-red-50",
    textActive: "text-red-700",
  },
  {
    value: "medium",
    label: "Sedang",
    dot: "bg-amber-500",
    activeClass: "border-amber-200 bg-amber-50",
    textActive: "text-amber-700",
  },
  {
    value: "low",
    label: "Rendah",
    dot: "bg-emerald-500",
    activeClass: "border-emerald-200 bg-emerald-50",
    textActive: "text-emerald-700",
  },
];

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
  if (!form.value.title.trim()) return;
  emit("save", { ...form.value });
};
</script>
