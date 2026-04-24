<template>
  <div class="min-h-screen bg-slate-50">
    <Navbar />
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div class="mb-8">
        <h1 class="font-extrabold text-slate-800 text-3xl">Board Saya</h1>
        <p class="text-slate-500 mt-1 text-sm">
          {{ boardStore.boards.length }} board aktif
        </p>
      </div>

      <div v-if="loading" class="flex items-center justify-center py-24">
        <div
          class="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="board in boardStore.boards"
          :key="board.id"
          @click="router.push(`/board/${board.id}`)"
          class="group relative rounded-2xl p-5 text-white cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 shadow-md overflow-hidden min-h-36 flex flex-col justify-between"
          :style="{ backgroundColor: board.color }"
        >
          <div class="absolute inset-0 opacity-[0.08]">
            <svg width="100%" height="100%">
              <pattern
                id="dots"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
          <div class="relative">
            <div
              class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3"
            >
              <LayoutDashboard class="w-4 h-4 text-white" />
            </div>
            <h3 class="font-extrabold text-lg leading-tight">
              {{ board.title }}
            </h3>
            <p
              v-if="board.description"
              class="text-sm opacity-75 mt-1 line-clamp-2"
            >
              {{ board.description }}
            </p>
          </div>
          <div class="relative flex items-center justify-between mt-4">
            <span
              class="text-xs opacity-60 font-medium flex items-center gap-1"
            >
              <ArrowRight class="w-3 h-3" /> Buka board
            </span>
            <button
              @click.stop="handleDeleteBoard(board.id)"
              class="opacity-0 group-hover:opacity-100 transition-all w-7 h-7 bg-black bg-opacity-20 hover:bg-opacity-40 rounded-lg flex items-center justify-center"
            >
              <Trash2 class="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        <!-- Card tambah -->
        <div
          @click="openCreateModal"
          class="rounded-2xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 min-h-36 gap-2 group"
        >
          <div
            class="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <Plus class="w-5 h-5" />
          </div>
          <span class="text-sm font-semibold">Buat Board Baru</span>
        </div>
      </div>
    </div>

    <!-- Modal Buat Board -->
    <transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="showModal = false"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in"
        >
          <div
            class="flex items-center justify-between p-6 border-b border-slate-100"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center"
              >
                <LayoutDashboard class="w-5 h-5 text-blue-600" />
              </div>
              <h2 class="font-extrabold text-slate-800 text-lg">Board Baru</h2>
            </div>
            <button
              @click="showModal = false"
              class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5"
                >Judul Board *</label
              >
              <input
                v-model="newBoard.title"
                type="text"
                placeholder="contoh: Project Website, Sprint Q1..."
                class="input"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5"
                >Deskripsi</label
              >
              <input
                v-model="newBoard.description"
                type="text"
                placeholder="Deskripsi singkat (opsional)"
                class="input"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2"
                >Warna Board</label
              >
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="c in colorPresets"
                  :key="c"
                  @click="newBoard.color = c"
                  class="w-9 h-9 rounded-xl transition-all hover:scale-110 border-2 flex items-center justify-center"
                  :style="{
                    backgroundColor: c,
                    borderColor:
                      newBoard.color === c ? '#1e40af' : 'transparent',
                  }"
                >
                  <Check
                    v-if="newBoard.color === c"
                    class="w-4 h-4 text-white"
                  />
                </button>
              </div>
            </div>
            <div
              class="rounded-xl p-4 text-white text-sm font-semibold relative overflow-hidden"
              :style="{ backgroundColor: newBoard.color }"
            >
              <div class="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <pattern
                    id="prev-dots"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="1.5" fill="white" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#prev-dots)" />
                </svg>
              </div>
              <p class="relative opacity-70 text-xs mb-1">Preview</p>
              <p class="relative font-extrabold">
                {{ newBoard.title || "Judul Board" }}
              </p>
            </div>
          </div>

          <div class="flex gap-3 p-6 pt-0">
            <button
              @click="handleCreateBoard"
              :disabled="creating"
              class="btn-primary flex-1 justify-center py-2.5 disabled:opacity-60"
            >
              <Loader2 v-if="creating" class="w-4 h-4 animate-spin" />
              <Check v-else class="w-4 h-4" />
              {{ creating ? "Menyimpan..." : "Buat Board" }}
            </button>
            <button @click="showModal = false" class="btn-secondary">
              Batal
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBoardStore } from "../stores/boardStore";
import { useToast } from "../composables/useToast";
import { useConfirm } from "../composables/useConfirm";
import Navbar from "../components/Navbar.vue";
import {
  Plus,
  LayoutDashboard,
  Trash2,
  ArrowRight,
  X,
  Check,
  Loader2,
} from "lucide-vue-next";

const router = useRouter();
const boardStore = useBoardStore();
const { success, error: toastError } = useToast();
const { ask } = useConfirm();

const loading = ref(false);
const showModal = ref(false);
const creating = ref(false);
const newBoard = ref({ title: "", description: "", color: "#2563EB" });
const colorPresets = [
  "#2563EB",
  "#0891B2",
  "#059669",
  "#D97706",
  "#DC2626",
  "#7C3AED",
  "#DB2777",
  "#0F172A",
];

onMounted(async () => {
  loading.value = true;
  await boardStore.fetchBoards();
  loading.value = false;
});

const openCreateModal = () => {
  newBoard.value = { title: "", description: "", color: "#2563EB" };
  showModal.value = true;
};

const handleCreateBoard = async () => {
  if (!newBoard.value.title.trim()) {
    toastError("Judul wajib diisi", "Masukkan judul board terlebih dahulu");
    return;
  }
  creating.value = true;
  try {
    await boardStore.createBoard(newBoard.value);
    showModal.value = false;
    success(
      "Board berhasil dibuat!",
      `"${newBoard.value.title}" siap digunakan`,
    );
  } catch {
    toastError("Gagal membuat board", "Terjadi kesalahan, coba lagi");
  } finally {
    creating.value = false;
  }
};

const handleDeleteBoard = async (id) => {
  const board = boardStore.boards.find((b) => b.id === id);
  const confirmed = await ask({
    title: "Hapus Board?",
    message: `Board "${board?.title}" dan semua isinya akan dihapus permanen.`,
    confirmText: "Ya, Hapus",
    type: "danger",
  });
  if (confirmed) {
    try {
      await boardStore.deleteBoard(id);
      success("Board dihapus");
    } catch {
      toastError("Gagal menghapus");
    }
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
