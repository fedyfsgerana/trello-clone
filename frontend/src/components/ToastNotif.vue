<template>
  <teleport to="body">
    <div
      class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto animate-toast flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium min-w-72 max-w-sm"
          :class="{
            'bg-white border-green-200 text-green-800':
              toast.type === 'success',
            'bg-white border-red-200 text-red-800': toast.type === 'error',
            'bg-white border-blue-200 text-blue-800': toast.type === 'info',
            'bg-white border-yellow-200 text-yellow-800':
              toast.type === 'warning',
          }"
        >
          <span class="text-lg flex-shrink-0">
            {{
              toast.type === "success"
                ? "✅"
                : toast.type === "error"
                  ? "❌"
                  : toast.type === "warning"
                    ? "⚠️"
                    : "ℹ️"
            }}
          </span>
          <div class="flex-1">
            <p class="font-semibold">{{ toast.title }}</p>
            <p v-if="toast.message" class="opacity-75 text-xs mt-0.5">
              {{ toast.message }}
            </p>
          </div>
          <button
            @click="remove(toast.id)"
            class="opacity-40 hover:opacity-100 transition text-lg leading-none"
          >
            ×
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue";

const toasts = ref([]);

const add = (type, title, message = "", duration = 3500) => {
  const id = Date.now();
  toasts.value.push({ id, type, title, message });
  setTimeout(() => remove(id), duration);
};

const remove = (id) => {
  toasts.value = toasts.value.filter((t) => t.id !== id);
};

defineExpose({ add });
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
