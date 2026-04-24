<template>
  <div class="min-h-screen bg-blue-700">
    <Navbar />

    <div v-if="boardStore.currentBoard" class="p-6">
      <!-- Header board -->
      <div class="flex items-center gap-4 mb-6">
        <h2 class="text-2xl font-bold text-white">
          {{ boardStore.currentBoard.title }}
        </h2>
        <button
          @click="handleAddColumn"
          class="bg-white bg-opacity-20 text-white px-3 py-1 rounded hover:bg-opacity-30 text-sm"
        >
          + Tambah Kolom
        </button>
      </div>

      <!-- Kanban board -->
      <div class="flex gap-4 overflow-x-auto pb-4">
        <KanbanColumn
          v-for="column in boardStore.currentBoard.columns"
          :key="column.id"
          :column="column"
          @delete-column="handleDeleteColumn"
          @add-task="handleAddTask"
          @refresh="loadBoard"
        />
      </div>
    </div>

    <div v-else class="text-white text-center py-20">Memuat board...</div>

    <!-- Modal tambah task -->
    <TaskModal
      v-if="showTaskModal"
      :task="null"
      :is-edit="false"
      @save="handleSaveTask"
      @close="showTaskModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useBoardStore } from "../stores/boardStore";
import { useTaskStore } from "../stores/taskStore";
import Navbar from "../components/Navbar.vue";
import KanbanColumn from "../components/KanbanColumn.vue";
import TaskModal from "../components/TaskModal.vue";

const route = useRoute();
const boardStore = useBoardStore();
const taskStore = useTaskStore();

const showTaskModal = ref(false);
const activeColumnId = ref(null);

const loadBoard = async () => {
  await boardStore.fetchBoardById(route.params.id);
};

onMounted(loadBoard);

const handleAddColumn = async () => {
  const title = prompt("Nama kolom baru:");
  if (title) {
    await taskStore.createColumn(route.params.id, title);
    await loadBoard();
  }
};

const handleDeleteColumn = async (columnId) => {
  if (confirm("Hapus kolom ini beserta semua task-nya?")) {
    await taskStore.deleteColumn(columnId);
    await loadBoard();
  }
};

const handleAddTask = (columnId) => {
  activeColumnId.value = columnId;
  showTaskModal.value = true;
};

const handleSaveTask = async (data) => {
  await taskStore.createTask(activeColumnId.value, data);
  showTaskModal.value = false;
  await loadBoard();
};
</script>
