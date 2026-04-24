<template>
  <div class="min-h-screen" :style="{ background: bgColor }">
    <Navbar />

    <div v-if="boardStore.currentBoard" class="p-6">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6">
        <router-link
          to="/"
          class="text-white opacity-70 hover:opacity-100 transition text-sm"
        >
          ← Kembali
        </router-link>
        <h2 class="text-2xl font-black text-white">
          {{ boardStore.currentBoard.title }}
        </h2>
        <span class="text-white opacity-60 text-sm">
          {{ boardStore.currentBoard.columns?.length }} kolom
        </span>
        <button
          @click="handleAddColumn"
          class="ml-auto bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-xl font-semibold text-sm transition backdrop-blur"
        >
          + Tambah Kolom
        </button>
      </div>

      <!-- Kanban -->
      <div class="flex gap-4 overflow-x-auto pb-6">
        <KanbanColumn
          v-for="column in boardStore.currentBoard.columns"
          :key="column.id"
          :column="column"
          @delete-column="handleDeleteColumn"
          @add-task="handleAddTask"
          @refresh="loadBoard"
        />

        <!-- Tambah kolom shortcut -->
        <div
          @click="handleAddColumn"
          class="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-2xl p-4 w-64 flex-shrink-0 cursor-pointer transition flex items-center justify-center text-white opacity-70 hover:opacity-100 border-2 border-dashed border-white border-opacity-30 min-h-32"
        >
          <span class="text-sm font-semibold">+ Kolom Baru</span>
        </div>
      </div>
    </div>

    <div v-else class="text-white text-center py-20">
      <div
        class="inline-block w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"
      ></div>
      <p class="mt-3 opacity-70">Memuat board...</p>
    </div>

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
import { onMounted, ref, computed } from "vue";
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

const bgColor = computed(() => {
  const color = boardStore.currentBoard?.color || "#4F46E5";
  return `linear-gradient(135deg, ${color}dd, ${color}99)`;
});

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
