<template>
  <teleport to="body">
    <div
      class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium min-w-72 max-w-sm bg-white"
          :class="{
            'border-green-200': toast.type === 'success',
            'border-red-200': toast.type === 'error',
            'border-blue-200': toast.type === 'info',
            'border-yellow-200': toast.type === 'warning',
          }"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="{
              'bg-green-50': toast.type === 'success',
              'bg-red-50': toast.type === 'error',
              'bg-blue-50': toast.type === 'info',
              'bg-yellow-50': toast.type === 'warning',
            }"
          >
            <CheckCircle
              v-if="toast.type === 'success'"
              class="w-4 h-4 text-green-600"
            />
            <XCircle
              v-else-if="toast.type === 'error'"
              class="w-4 h-4 text-red-600"
            />
            <AlertTriangle
              v-else-if="toast.type === 'warning'"
              class="w-4 h-4 text-yellow-600"
            />
            <Info v-else class="w-4 h-4 text-blue-600" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-slate-800">{{ toast.title }}</p>
            <p v-if="toast.message" class="text-slate-500 text-xs mt-0.5">
              {{ toast.message }}
            </p>
          </div>
          <button
            @click="remove(toast.id)"
            class="text-slate-300 hover:text-slate-500 transition flex-shrink-0"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-vue-next";

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
