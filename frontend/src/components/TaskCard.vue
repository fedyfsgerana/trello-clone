<template>
  <div
    class="bg-white rounded shadow p-3 cursor-pointer hover:shadow-md transition"
    @click="$emit('click')"
  >
    <span
      class="text-xs font-medium px-2 py-0.5 rounded-full"
      :class="{
        'bg-red-100 text-red-600': task.priority === 'high',
        'bg-yellow-100 text-yellow-600': task.priority === 'medium',
        'bg-green-100 text-green-600': task.priority === 'low',
      }"
    >
      {{ task.priority }}
    </span>

    <p class="text-sm font-medium text-gray-800 mt-2">{{ task.title }}</p>

    <p v-if="task.due_date" class="text-xs text-gray-400 mt-1">
      📅 {{ formatDate(task.due_date) }}
    </p>
  </div>
</template>

<script setup>
defineProps({ task: Object });
defineEmits(["click"]);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
</script>
