<template>
  <div class="min-h-screen bg-blue-600 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-600">Trello Clone</h1>
        <p class="text-gray-500 mt-2">Buat akun baru</p>
      </div>
      <div
        v-if="error"
        class="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm"
      >
        {{ error }}
      </div>
      <div
        v-if="success"
        class="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm"
      >
        {{ success }}
      </div>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Nama Lengkap</label
          >
          <input
            v-model="name"
            type="text"
            placeholder="John Doe"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
            placeholder="Minimal 8 karakter"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          @click="handleRegister"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? "Memproses..." : "Daftar" }}
        </button>
      </div>
      <p class="text-center text-sm text-gray-500 mt-6">
        Sudah punya akun?
        <router-link
          to="/login"
          class="text-blue-600 font-medium hover:underline"
        >
          Masuk di sini
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

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);

const handleRegister = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;
  try {
    await authStore.register(name.value, email.value, password.value);
    success.value = "Registrasi berhasil! Silakan login.";
    setTimeout(() => router.push("/login"), 1500);
  } catch (err) {
    error.value = err.response?.data?.message || "Registrasi gagal, coba lagi";
  } finally {
    loading.value = false;
  }
};
</script>
