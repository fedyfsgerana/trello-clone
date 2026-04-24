<template>
  <div
    class="min-h-screen flex flex-col"
    :style="{ backgroundColor: boardColor }"
  >
    <Navbar />

    <div v-if="boardStore.currentBoard" class="flex-1 flex flex-col p-6">
      <div class="flex items-center gap-3 mb-6 flex-wrap">
        <button
          @click="router.push('/')"
          class="flex items-center gap-1.5 text-white bg-white bg-opacity-15 hover:bg-opacity-25 px-3 py-1.5 rounded-xl text-sm font-medium transition border border-white border-opacity-20"
        >
          <ChevronLeft class="w-4 h-4" /> Kembali
        </button>
        <h1 class="font-extrabold text-white text-xl">
          {{ boardStore.currentBoard.title }}
        </h1>
        <span
          class="bg-white bg-opacity-20 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
        >
          {{ boardStore.currentBoard.columns?.length }} kolom
        </span>
        <button
          @click="openAddColumn"
          class="ml-auto flex items-center gap-1.5 bg-white bg-opacity-15 hover:bg-opacity-25 text-white text-sm font-semibold px-4 py-2 rounded-xl transition border border-white border-opacity-20"
        >
          <Plus class="w-4 h-4" /> Tambah Kolom
        </button>
      </div>

      <div class="flex gap-4 overflow-x-auto pb-4 flex-1 items-start">
        <KanbanColumn
          v-for="column in boardStore.currentBoard.columns"
          :key="column.id"
          :column="column"
          @delete-column="handleDeleteColumn"
          @add-task="handleAddTask"
          @refresh="loadBoard"
        />
        <div
          @click="openAddColumn"
          class="flex-shrink-0 w-72 border-2 border-dashed border-white border-opacity-30 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-10 transition-all py-8 text-white opacity-50 hover:opacity-100 gap-2 min-h-32"
        >
          <PlusCircle class="w-8 h-8" />
          <span class="text-sm font-semibold">Tambah Kolom</span>
        </div>
      </div>
    </div>

    <div v-else class="flex-1 flex items-center justify-center">
      <div class="text-center text-white">
        <div
          class="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3"
        ></div>
        <p class="opacity-60 text-sm">Memuat board...</p>
      </div>
    </div>

    <!-- Modal tambah kolom -->
    <transition name="modal">
      <div
        v-if="showColumnModal"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="showColumnModal = false"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in p-6"
        >
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-extrabold text-slate-800 text-lg">Kolom Baru</h3>
            <button
              @click="showColumnModal = false"
              class="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
          <input
            v-model="newColumnTitle"
            type="text"
            placeholder="contoh: To Do, In Progress, Done..."
            class="input mb-4"
            @keyup.enter="handleAddColumn"
          />
          <div class="flex gap-2">
            <button
              @click="handleAddColumn"
              :disabled="addingColumn"
              class="btn-primary flex-1 justify-center"
            >
              <Loader2 v-if="addingColumn" class="w-4 h-4 animate-spin" />
              <Check v-else class="w-4 h-4" />
              {{ addingColumn ? "Menyimpan..." : "Tambah" }}
            </button>
            <button @click="showColumnModal = false" class="btn-secondary">
              Batal
            </button>
          </div>
        </div>
      </div>
    </transition>

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
import { useRoute, useRouter } from "vue-router";
import { useBoardStore } from "../stores/boardStore";
import { useTaskStore } from "../stores/taskStore";
import { useToast } from "../composables/useToast";
import { useConfirm } from "../composables/useConfirm";
import Navbar from "../components/Navbar.vue";
import KanbanColumn from "../components/KanbanColumn.vue";
import TaskModal from "../components/TaskModal.vue";
import {
  Plus,
  PlusCircle,
  ChevronLeft,
  X,
  Check,
  Loader2,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();
const taskStore = useTaskStore();
const { success, error: toastError } = useToast();
const { ask } = useConfirm();

const showTaskModal = ref(false);
const showColumnModal = ref(false);
const newColumnTitle = ref("");
const addingColumn = ref(false);
const activeColumnId = ref(null);

const boardColor = computed(() => boardStore.currentBoard?.color || "#2563EB");
const loadBoard = async () => {
  await boardStore.fetchBoardById(route.params.id);
};
onMounted(loadBoard);

const openAddColumn = () => {
  newColumnTitle.value = "";
  showColumnModal.value = true;
};

const handleAddColumn = async () => {
  if (!newColumnTitle.value.trim()) {
    toastError("Nama kolom wajib diisi");
    return;
  }
  addingColumn.value = true;
  try {
    await taskStore.createColumn(route.params.id, newColumnTitle.value);
    showColumnModal.value = false;
    await loadBoard();
    success("Kolom ditambahkan!", newColumnTitle.value);
  } catch {
    toastError("Gagal menambah kolom");
  } finally {
    addingColumn.value = false;
  }
};

const handleDeleteColumn = async (columnId) => {
  const col = boardStore.currentBoard.columns.find((c) => c.id === columnId);
  const confirmed = await ask({
    title: "Hapus Kolom?",
    message: `Kolom "${col?.title}" dan semua task di dalamnya akan dihapus.`,
    confirmText: "Ya, Hapus",
    type: "danger",
  });
  if (confirmed) {
    try {
      await taskStore.deleteColumn(columnId);
      await loadBoard();
      success("Kolom dihapus");
    } catch {
      toastError("Gagal menghapus kolom");
    }
  }
};

const handleAddTask = (columnId) => {
  activeColumnId.value = columnId;
  showTaskModal.value = true;
};

const handleSaveTask = async (data) => {
  try {
    await taskStore.createTask(activeColumnId.value, data);
    showTaskModal.value = false;
    await loadBoard();
    success("Task ditambahkan!", data.title);
  } catch {
    toastError("Gagal menambah task");
  }
};
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
