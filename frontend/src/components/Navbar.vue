<template>
  <nav
    class="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow"
  >
    <router-link to="/" class="text-xl font-bold tracking-wide"
      >🗂️ Trello Clone</router-link
    >

    <div class="flex items-center gap-4">
      <span class="text-sm">👤 {{ authStore.user?.name }}</span>
      <button
        @click="handleLogout"
        class="bg-white text-blue-600 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
