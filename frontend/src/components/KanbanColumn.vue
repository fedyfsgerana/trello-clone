<template>
  <div
    class="bg-white bg-opacity-15 backdrop-blur rounded-2xl p-4 w-72 flex-shrink-0 border border-white border-opacity-20"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <span
          class="bg-white bg-opacity-25 text-white text-xs font-black px-2 py-0.5 rounded-full"
        >
          {{ column.tasks?.length || 0 }}
        </span>
        <h3 class="font-black text-white">{{ column.title }}</h3>
      </div>
      <button
        @click="$emit('delete-column', column.id)"
        class="text-white opacity-40 hover:opacity-100 hover:text-red-300 transition w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-20"
      >
        <XMarkIcon class="w-4 h-4" />
      </button>
    </div>

    <draggable
      :list="column.tasks"
      group="tasks"
      item-key="id"
      class="space-y-2 min-h-[8px]"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <TaskCard :task="element" @click="openModal(element)" />
      </template>
    </draggable>

    <button
      @click="$emit('add-task', column.id)"
      class="mt-3 w-full text-sm text-white opacity-60 hover:opacity-100 hover:bg-white hover:bg-opacity-10 rounded-xl px-3 py-2 transition flex items-center gap-2"
    >
      <PlusIcon class="w-4 h-4" /> Tambah task
    </button>
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
import { XMarkIcon, PlusIcon } from "@heroicons/vue/24/outline";
import TaskCard from "./TaskCard.vue";
import TaskModal from "./TaskModal.vue";
import { useTaskStore } from "../stores/taskStore";

const props = defineProps({ column: Object });
const emit = defineEmits(["delete-column", "add-task", "refresh"]);
const taskStore = useTaskStore();
const selectedTask = ref(null);

const openModal = (task) => {
  selectedTask.value = { ...task };
};

const handleUpdateTask = async (data) => {
  await taskStore.updateTask(selectedTask.value.id, data);
  selectedTask.value = null;
  emit("refresh");
};

const handleDeleteTask = async () => {
  if (confirm("Hapus task ini?")) {
    await taskStore.deleteTask(selectedTask.value.id);
    selectedTask.value = null;
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
