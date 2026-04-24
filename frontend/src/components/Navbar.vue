<template>
  <nav
    class="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm"
  >
    <router-link to="/" class="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="14" fill="#2563EB" />
        <rect
          x="10"
          y="10"
          width="18"
          height="26"
          rx="4"
          fill="white"
          opacity="0.9"
        />
        <rect
          x="10"
          y="42"
          width="18"
          height="12"
          rx="4"
          fill="white"
          opacity="0.5"
        />
        <rect
          x="36"
          y="10"
          width="18"
          height="12"
          rx="4"
          fill="white"
          opacity="0.5"
        />
        <rect
          x="36"
          y="28"
          width="18"
          height="26"
          rx="4"
          fill="white"
          opacity="0.9"
        />
      </svg>
      <span class="font-extrabold text-slate-800 text-lg tracking-tight"
        >TaskBoard</span
      >
    </router-link>

    <div class="flex items-center gap-3">
      <div
        class="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5"
      >
        <div
          class="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xs"
        >
          {{ authStore.user?.name?.charAt(0).toUpperCase() }}
        </div>
        <span class="text-sm font-medium text-slate-700">{{
          authStore.user?.name
        }}</span>
      </div>
      <button
        @click="handleLogout"
        class="flex items-center gap-1.5 text-slate-500 hover:text-red-500 text-sm font-medium px-3 py-2 rounded-xl hover:bg-red-50 transition-all duration-150"
      >
        <LogOut class="w-4 h-4" />
        <span class="hidden sm:inline">Logout</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { LogOut } from "lucide-vue-next";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
