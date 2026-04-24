<template>
  <div
    class="bg-white rounded-xl shadow-sm p-3 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 border border-gray-100 group"
    @click="$emit('click')"
  >
    <div class="flex items-center justify-between mb-2">
      <span
        class="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
        :class="{
          'bg-red-100 text-red-600': task.priority === 'high',
          'bg-yellow-100 text-yellow-700': task.priority === 'medium',
          'bg-green-100 text-green-600': task.priority === 'low',
        }"
      >
        <FireIcon v-if="task.priority === 'high'" class="w-3 h-3" />
        <MinusCircleIcon
          v-else-if="task.priority === 'medium'"
          class="w-3 h-3"
        />
        <CheckCircleIcon v-else class="w-3 h-3" />
        {{ task.priority }}
      </span>
      <PencilIcon
        class="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 transition"
      />
    </div>

    <p class="text-sm font-semibold text-gray-800 leading-snug">
      {{ task.title }}
    </p>
    <p v-if="task.description" class="text-xs text-gray-400 mt-1 line-clamp-2">
      {{ task.description }}
    </p>

    <div v-if="task.due_date" class="flex items-center gap-1 mt-2">
      <CalendarDaysIcon class="w-3.5 h-3.5 text-gray-400" />
      <span class="text-xs text-gray-400">{{ formatDate(task.due_date) }}</span>
    </div>
  </div>
</template>

<script setup>
import {
  FireIcon,
  MinusCircleIcon,
  CheckCircleIcon,
  PencilIcon,
  CalendarDaysIcon,
} from "@heroicons/vue/24/outline";

defineProps({ task: Object });
defineEmits(["click"]);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
</script>
