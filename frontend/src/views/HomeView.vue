<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />

    <div class="max-w-6xl mx-auto px-6 py-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-700">Board Saya</h2>
        <button
          @click="showForm = true"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
        >
          + Buat Board
        </button>
      </div>

      <div v-if="showForm" class="bg-white rounded-lg shadow p-6 mb-6">
        <h3 class="font-semibold text-gray-700 mb-4">Board Baru</h3>
        <div class="space-y-3">
          <input
            v-model="newBoard.title"
            type="text"
            placeholder="Judul board"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="newBoard.description"
            type="text"
            placeholder="Deskripsi (opsional)"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div class="flex items-center gap-3">
            <label class="text-sm text-gray-600">Warna:</label>
            <input
              v-model="newBoard.color"
              type="color"
              class="w-10 h-10 rounded cursor-pointer"
            />
          </div>
          <div class="flex gap-2">
            <button
              @click="handleCreateBoard"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan
            </button>
            <button
              @click="showForm = false"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center text-gray-500 py-10">
        Memuat board...
      </div>

      <div
        v-else-if="boardStore.boards.length === 0"
        class="text-center text-gray-500 py-10"
      >
        Belum ada board. Buat board pertamamu!
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="board in boardStore.boards"
          :key="board.id"
          @click="router.push(`/board/${board.id}`)"
          class="rounded-lg p-4 text-white cursor-pointer hover:opacity-90 shadow relative"
          :style="{ backgroundColor: board.color }"
        >
          <h3 class="font-bold text-lg">{{ board.title }}</h3>
          <p class="text-sm opacity-80 mt-1">{{ board.description }}</p>

          <button
            @click.stop="handleDeleteBoard(board.id)"
            class="absolute top-2 right-2 text-white opacity-70 hover:opacity-100 text-lg"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBoardStore } from "../stores/boardStore";
import Navbar from "../components/Navbar.vue";

const router = useRouter();
const boardStore = useBoardStore();

const loading = ref(false);
const showForm = ref(false);
const newBoard = ref({ title: "", description: "", color: "#0079BF" });

onMounted(async () => {
  loading.value = true;
  await boardStore.fetchBoards();
  loading.value = false;
});

const handleCreateBoard = async () => {
  if (!newBoard.value.title) return;
  await boardStore.createBoard(newBoard.value);
  newBoard.value = { title: "", description: "", color: "#0079BF" };
  showForm.value = false;
};

const handleDeleteBoard = async (id) => {
  if (confirm("Hapus board ini?")) {
    await boardStore.deleteBoard(id);
  }
};
</script>
