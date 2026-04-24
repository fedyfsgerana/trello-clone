<template>
  <nav
    class="bg-gradient-to-r from-indigo-700 to-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-lg"
  >
    <router-link
      to="/"
      class="flex items-center gap-2 text-xl font-black tracking-wide"
    >
      <div
        class="bg-white text-indigo-600 rounded-xl w-9 h-9 flex items-center justify-center shadow"
      >
        <Squares2X2Icon class="w-5 h-5" />
      </div>
      TaskBoard
    </router-link>

    <div class="flex items-center gap-3">
      <div
        class="flex items-center gap-2 bg-white bg-opacity-15 rounded-full px-3 py-1.5"
      >
        <div
          class="w-7 h-7 bg-white text-indigo-600 rounded-full flex items-center justify-center font-black text-sm"
        >
          {{ authStore.user?.name?.charAt(0).toUpperCase() }}
        </div>
        <span class="text-sm font-semibold">{{ authStore.user?.name }}</span>
      </div>
      <button
        @click="handleLogout"
        class="flex items-center gap-1.5 bg-white bg-opacity-15 hover:bg-opacity-25 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition"
      >
        <ArrowRightOnRectangleIcon class="w-4 h-4" />
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import {
  Squares2X2Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
