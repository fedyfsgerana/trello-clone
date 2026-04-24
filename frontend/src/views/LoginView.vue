<template>
  <div class="min-h-screen bg-blue-600 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-600">Trello Clone</h1>
        <p class="text-gray-500 mt-2">Masuk ke akun kamu</p>
      </div>
      <div
        v-if="error"
        class="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm"
      >
        {{ error }}
      </div>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          @click="handleLogin"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? "Memproses..." : "Masuk" }}
        </button>
      </div>
      <p class="text-center text-sm text-gray-500 mt-6">
        Belum punya akun?
        <router-link
          to="/register"
          class="text-blue-600 font-medium hover:underline"
        >
          Daftar sekarang
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const handleLogin = async () => {
  error.value = "";
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    router.push("/");
  } catch (err) {
    error.value = err.response?.data?.message || "Login gagal, coba lagi";
  } finally {
    loading.value = false;
  }
};
</script>
