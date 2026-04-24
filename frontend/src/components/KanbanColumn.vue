<template>
  <div class="bg-gray-200 rounded-lg p-3 w-72 flex-shrink-0">
    <!-- Header kolom -->
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-semibold text-gray-700">{{ column.title }}</h3>
      <button
        @click="$emit('delete-column', column.id)"
        class="text-gray-400 hover:text-red-500 text-sm"
      >
        ✕
      </button>
    </div>

    <!-- Daftar task -->
    <draggable
      :list="column.tasks"
      group="tasks"
      item-key="id"
      class="space-y-2 min-h-[10px]"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <TaskCard :task="element" @click="openModal(element)" />
      </template>
    </draggable>

    <!-- Tambah task -->
    <button
      @click="$emit('add-task', column.id)"
      class="mt-3 w-full text-left text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-300 rounded px-2 py-1"
    >
      + Tambah task
    </button>
  </div>

  <!-- Modal edit task -->
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
    const newColumnId = parseInt(
      evt.to.__vue_app__?.config?.globalProperties?.$el?.dataset?.columnId,
    );
    await taskStore.moveTask(taskId, props.column.id, evt.newIndex);
    emit("refresh");
  }
};
</script>
