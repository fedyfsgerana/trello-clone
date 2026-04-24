<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9998] p-4"
        @click.self="cancel"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-fade-in"
        >
          <div class="flex items-start gap-4 mb-5">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              :class="type === 'danger' ? 'bg-red-50' : 'bg-blue-50'"
            >
              <Trash2 v-if="type === 'danger'" class="w-5 h-5 text-red-500" />
              <HelpCircle v-else class="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 class="font-extrabold text-slate-800 text-base">
                {{ title }}
              </h3>
              <p class="text-slate-500 text-sm mt-1">{{ message }}</p>
            </div>
          </div>
          <div class="flex gap-2 justify-end">
            <button @click="cancel" class="btn-secondary">Batal</button>
            <button
              @click="confirm"
              :class="type === 'danger' ? 'btn-danger' : 'btn-primary'"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from "vue";
import { Trash2, HelpCircle } from "lucide-vue-next";

const visible = ref(false);
const title = ref("");
const message = ref("");
const confirmText = ref("Konfirmasi");
const type = ref("danger");
let resolveFn = null;

const open = (opts) => {
  title.value = opts.title || "Konfirmasi";
  message.value = opts.message || "";
  confirmText.value = opts.confirmText || "Ya, Lanjutkan";
  type.value = opts.type || "danger";
  visible.value = true;
  return new Promise((resolve) => {
    resolveFn = resolve;
  });
};
const confirm = () => {
  visible.value = false;
  resolveFn?.(true);
};
const cancel = () => {
  visible.value = false;
  resolveFn?.(false);
};
defineExpose({ open });
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
