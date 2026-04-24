<template>
  <div
    @click="$emit('click')"
    class="bg-white rounded-xl p-3.5 cursor-pointer hover:shadow-md transition-all duration-150 border border-slate-100 group hover:-translate-y-0.5 animate-fade-in"
  >
    <div class="flex items-center justify-between mb-2.5">
      <span
        class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
        :class="{
          'bg-red-50 text-red-600 border border-red-100':
            task.priority === 'high',
          'bg-amber-50 text-amber-700 border border-amber-100':
            task.priority === 'medium',
          'bg-emerald-50 text-emerald-700 border border-emerald-100':
            task.priority === 'low',
        }"
      >
        <span
          class="w-1.5 h-1.5 rounded-full"
          :class="{
            'bg-red-500': task.priority === 'high',
            'bg-amber-500': task.priority === 'medium',
            'bg-emerald-500': task.priority === 'low',
          }"
        ></span>
        {{
          task.priority === "high"
            ? "Tinggi"
            : task.priority === "medium"
              ? "Sedang"
              : "Rendah"
        }}
      </span>
      <PencilSquareIcon
        class="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition opacity-0 group-hover:opacity-100"
      />
    </div>

    <p class="text-sm font-semibold text-slate-800 leading-snug">
      {{ task.title }}
    </p>

    <p
      v-if="task.description"
      class="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed"
    >
      {{ task.description }}
    </p>

    <div
      v-if="task.due_date"
      class="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-slate-50"
    >
      <CalendarDaysIcon class="w-3.5 h-3.5 text-slate-400" />
      <span class="text-xs text-slate-400 font-medium">{{
        formatDate(task.due_date)
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { PencilSquareIcon, CalendarDaysIcon } from "@heroicons/vue/24/outline";
defineProps({ task: Object });
defineEmits(["click"]);
const formatDate = (d) =>
  new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
</script>
