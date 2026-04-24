<template>
  <div class="min-h-screen flex">
    <!-- Left panel -->
    <div
      class="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 flex-col items-center justify-center p-12 text-white"
    >
      <div class="max-w-md text-center">
        <div
          class="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <span class="text-4xl font-black text-white">T</span>
        </div>
        <h1 class="text-4xl font-black mb-4">TaskBoard</h1>
        <p class="text-blue-100 text-lg leading-relaxed">
          Mulai gratis hari ini. Tidak perlu kartu kredit.
        </p>
      </div>
    </div>

    <!-- Right panel -->
    <div
      class="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8"
    >
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="mb-8">
            <h2 class="text-2xl font-black text-gray-800">Buat akun baru ✨</h2>
            <p class="text-gray-500 mt-1">Gratis selamanya, daftar sekarang!</p>
          </div>

          <div
            v-if="error"
            class="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm"
          >
            ⚠️ {{ error }}
          </div>
          <div
            v-if="success"
            class="bg-green-50 border border-green-200 text-green-600 p-3 rounded-xl mb-5 text-sm"
          >
            ✅ {{ success }}
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5"
                >Nama Lengkap</label
              >
              <input
                v-model="name"
                type="text"
                placeholder="John Doe"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition text-gray-800"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                placeholder="email@example.com"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition text-gray-800"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                placeholder="Minimal 8 karakter"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition text-gray-800"
              />
            </div>

            <button
              @click="handleRegister"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition shadow-md shadow-blue-200 mt-2"
            >
              {{ loading ? "⏳ Memproses..." : "Daftar Sekarang →" }}
            </button>
          </div>

          <p class="text-center text-sm text-gray-500 mt-6">
            Sudah punya akun?
            <router-link
              to="/login"
              class="text-blue-600 font-bold hover:underline"
            >
              Masuk di sini
            </router-link>
          </p>
        </div>
      </div>
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
    success.value = "Registrasi berhasil! Mengalihkan ke login...";
    setTimeout(() => router.push("/login"), 1500);
  } catch (err) {
    error.value = err.response?.data?.message || "Registrasi gagal, coba lagi";
  } finally {
    loading.value = false;
  }
};
</script>
