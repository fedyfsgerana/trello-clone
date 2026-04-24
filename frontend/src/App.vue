<template>
  <router-view />
  <ToastNotif ref="toastRef" />
  <ConfirmModal ref="confirmRef" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import ToastNotif from "./components/ToastNotif.vue";
import ConfirmModal from "./components/ConfirmModal.vue";
import { useToast } from "./composables/useToast";
import { useConfirm } from "./composables/useConfirm";

const toastRef = ref(null);
const confirmRef = ref(null);
const { toastRef: globalToast } = useToast();
const { confirmRef: globalConfirm } = useConfirm();

onMounted(() => {
  globalToast.value = toastRef.value;
  globalConfirm.value = confirmRef.value;
});
</script>
