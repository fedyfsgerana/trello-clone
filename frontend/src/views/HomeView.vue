<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-black text-gray-800">Board Saya</h2>
          <p class="text-gray-500 mt-1">
            {{ boardStore.boards.length }} board aktif
          </p>
        </div>
        <button
          @click="showForm = !showForm"
          class="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition shadow-md shadow-blue-200 flex items-center gap-2"
        >
          <PlusIcon class="w-5 h-5" />
          Buat Board
        </button>
      </div>

      <!-- Form -->
      <transition name="slide">
        <div
          v-if="showForm"
          class="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <h3
            class="font-bold text-gray-700 mb-4 text-lg flex items-center gap-2"
          >
            <PencilSquareIcon class="w-5 h-5 text-indigo-500" />
            Board Baru
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="relative">
              <RectangleStackIcon
                class="w-5 h-5 text-gray-400 absolute left-3 top-3"
              />
              <input
                v-model="newBoard.title"
                type="text"
                placeholder="Judul board *"
                class="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
            <div class="relative">
              <ChatBubbleLeftIcon
                class="w-5 h-5 text-gray-400 absolute left-3 top-3"
              />
              <input
                v-model="newBoard.description"
                type="text"
                placeholder="Deskripsi (opsional)"
                class="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div class="flex items-center gap-4 mt-4">
            <label
              class="text-sm font-bold text-gray-600 flex items-center gap-1"
            >
              <SwatchIcon class="w-4 h-4" /> Warna:
            </label>
            <div class="flex gap-2">
              <div
                v-for="c in colorPresets"
                :key="c"
                @click="newBoard.color = c"
                class="w-8 h-8 rounded-lg cursor-pointer hover:scale-110 transition border-4"
                :style="{
                  backgroundColor: c,
                  borderColor: newBoard.color === c ? '#1e40af' : 'transparent',
                }"
              />
            </div>
          </div>

          <div class="flex gap-3 mt-5">
            <button
              @click="handleCreateBoard"
              class="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition flex items-center gap-2"
            >
              <CheckIcon class="w-4 h-4" /> Simpan Board
            </button>
            <button
              @click="showForm = false"
              class="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center gap-2"
            >
              <XMarkIcon class="w-4 h-4" /> Batal
            </button>
          </div>
        </div>
      </transition>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div
          class="inline-block w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p class="text-gray-500 mt-3">Memuat board...</p>
      </div>

      <!-- Kosong -->
      <div v-else-if="boardStore.boards.length === 0" class="text-center py-20">
        <RectangleStackIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-gray-700">Belum ada board</h3>
        <p class="text-gray-500 mt-2">Buat board pertamamu sekarang!</p>
      </div>

      <!-- Grid Board -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <div
          v-for="board in boardStore.boards"
          :key="board.id"
          @click="router.push(`/board/${board.id}`)"
          class="rounded-2xl p-5 text-white cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200 shadow-md relative overflow-hidden group min-h-36"
          :style="{ backgroundColor: board.color }"
        >
          <div class="absolute inset-0 opacity-10">
            <div
              class="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-8 translate-x-8"
            ></div>
            <div
              class="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-6 -translate-x-6"
            ></div>
          </div>
          <div class="relative">
            <Squares2X2Icon class="w-6 h-6 opacity-70 mb-2" />
            <h3 class="font-black text-lg leading-tight">{{ board.title }}</h3>
            <p class="text-sm opacity-75 mt-1 line-clamp-2">
              {{ board.description }}
            </p>
            <div class="flex items-center justify-between mt-4">
              <span class="text-xs opacity-70 flex items-center gap-1">
                <ArrowRightIcon class="w-3 h-3" /> Buka board
              </span>
              <button
                @click.stop="handleDeleteBoard(board.id)"
                class="opacity-0 group-hover:opacity-100 transition text-white hover:text-red-200"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Card tambah -->
        <div
          @click="showForm = true"
          class="rounded-2xl p-5 border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 flex flex-col items-center justify-center text-gray-400 hover:text-indigo-500 min-h-36"
        >
          <PlusCircleIcon class="w-10 h-10 mb-2" />
          <span class="text-sm font-bold">Buat Board Baru</span>
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
import {
  PlusIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  TrashIcon,
  ArrowRightIcon,
  SwatchIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const boardStore = useBoardStore();

const loading = ref(false);
const showForm = ref(false);
const newBoard = ref({ title: "", description: "", color: "#4F46E5" });
const colorPresets = [
  "#4F46E5",
  "#0891B2",
  "#059669",
  "#D97706",
  "#DC2626",
  "#7C3AED",
  "#DB2777",
];

onMounted(async () => {
  loading.value = true;
  await boardStore.fetchBoards();
  loading.value = false;
});

const handleCreateBoard = async () => {
  if (!newBoard.value.title) return;
  await boardStore.createBoard(newBoard.value);
  newBoard.value = { title: "", description: "", color: "#4F46E5" };
  showForm.value = false;
};

const handleDeleteBoard = async (id) => {
  if (confirm("Hapus board ini?")) {
    await boardStore.deleteBoard(id);
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
