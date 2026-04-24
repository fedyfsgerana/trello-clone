<template>
  <div
    class="flex-shrink-0 w-72 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-15 flex flex-col max-h-[calc(100vh-180px)]"
  >
    <div class="flex items-center justify-between p-4 pb-3">
      <div class="flex items-center gap-2">
        <span
          class="bg-white bg-opacity-20 text-white text-xs font-bold px-2 py-0.5 rounded-full"
        >
          {{ column.tasks?.length || 0 }}
        </span>
        <h3 class="font-bold text-white text-sm">{{ column.title }}</h3>
      </div>
      <button
        @click="$emit('delete-column', column.id)"
        class="w-7 h-7 rounded-lg text-white opacity-40 hover:opacity-100 hover:bg-white hover:bg-opacity-20 flex items-center justify-center transition-all"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <div class="flex-1 overflow-y-auto px-3 pb-2 space-y-2">
      <draggable
        :list="column.tasks"
        group="tasks"
        item-key="id"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <TaskCard :task="element" @click="openModal(element)" />
        </template>
      </draggable>
    </div>

    <div class="p-3 pt-2 border-t border-white border-opacity-10">
      <button
        @click="$emit('add-task', column.id)"
        class="w-full flex items-center gap-2 text-white opacity-50 hover:opacity-100 hover:bg-white hover:bg-opacity-10 rounded-xl px-3 py-2 transition-all text-sm font-medium"
      >
        <Plus class="w-4 h-4" /> Tambah task
      </button>
    </div>
  </div>

  <TaskModal
    v-if="selectedTask"
    :task="selectedTask"
    :is-edit="true"
    @save="handleUpdateTask"
    @delete="handleDeleteTask"
    @close="selectedTask = null"
  />
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { X, Plus } from "lucide-vue-next";
import TaskCard from "./TaskCard.vue";
import TaskModal from "./TaskModal.vue";
import { useTaskStore } from "../stores/taskStore";
import { useToast } from "../composables/useToast";
import { useConfirm } from "../composables/useConfirm";

const props = defineProps({ column: Object });
const emit = defineEmits(["delete-column", "add-task", "refresh"]);
const taskStore = useTaskStore();
const { success } = useToast();
const { ask } = useConfirm();
const selectedTask = ref(null);

const openModal = (task) => {
  selectedTask.value = { ...task };
};

const handleUpdateTask = async (data) => {
  await taskStore.updateTask(selectedTask.value.id, data);
  selectedTask.value = null;
  success("Task diperbarui!");
  emit("refresh");
};

const handleDeleteTask = async () => {
  const confirmed = await ask({
    title: "Hapus Task?",
    message: `"${selectedTask.value.title}" akan dihapus permanen.`,
    confirmText: "Ya, Hapus",
    type: "danger",
  });
  if (confirmed) {
    await taskStore.deleteTask(selectedTask.value.id);
    selectedTask.value = null;
    success("Task dihapus");
    emit("refresh");
  }
};

const onDragEnd = async (evt) => {
  if (evt.to !== evt.from) {
    const taskId = evt.item._underlying_vm_.id;
    await taskStore.moveTask(taskId, props.column.id, evt.newIndex);
    emit("refresh");
  }
};
</script>
