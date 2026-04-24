<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Left branding -->
    <div
      class="hidden lg:flex w-5/12 bg-blue-600 flex-col justify-between p-12 relative overflow-hidden"
    >
      <div class="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="white"
              stroke-width="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div class="relative z-10 flex items-center gap-3">
        <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="white" opacity="0.2" />
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
        <span class="font-extrabold text-white text-xl">TaskBoard</span>
      </div>
      <div class="relative z-10">
        <h2 class="font-extrabold text-white text-4xl leading-tight mb-4">
          Kelola proyek<br />lebih efisien.
        </h2>
        <p class="text-blue-100 text-base leading-relaxed">
          Buat board, atur kolom, dan pantau setiap task dalam satu tempat yang
          rapi.
        </p>
      </div>
      <div class="relative z-10 grid grid-cols-3 gap-3">
        <div
          class="bg-white bg-opacity-10 rounded-xl p-4 border border-white border-opacity-20"
        >
          <Rocket class="w-6 h-6 text-white mb-2" />
          <p class="text-white text-xs font-semibold">Cepat & Ringan</p>
        </div>
        <div
          class="bg-white bg-opacity-10 rounded-xl p-4 border border-white border-opacity-20"
        >
          <ShieldCheck class="w-6 h-6 text-white mb-2" />
          <p class="text-white text-xs font-semibold">Aman & Privat</p>
        </div>
        <div
          class="bg-white bg-opacity-10 rounded-xl p-4 border border-white border-opacity-20"
        >
          <Smartphone class="w-6 h-6 text-white mb-2" />
          <p class="text-white text-xs font-semibold">Responsif</p>
        </div>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-md animate-fade-in">
        <div class="flex items-center gap-2 mb-8 lg:hidden">
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
          <span class="font-extrabold text-slate-800 text-xl">TaskBoard</span>
        </div>

        <div class="mb-8">
          <h1 class="font-extrabold text-slate-800 text-3xl mb-1">
            Selamat datang!
          </h1>
          <p class="text-slate-500 text-sm">
            Masuk untuk melanjutkan ke dashboard kamu
          </p>
        </div>

        <div
          v-if="error"
          class="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 flex items-center gap-2 text-red-700 text-sm animate-slide-down"
        >
          <AlertCircle class="w-4 h-4 flex-shrink-0" />
          {{ error }}
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5"
              >Alamat Email</label
            >
            <div class="relative">
              <Mail
                class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                v-model="email"
                type="email"
                placeholder="kamu@email.com"
                @keyup.enter="handleLogin"
                class="input pl-10"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5"
              >Password</label
            >
            <div class="relative">
              <Lock
                class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                placeholder="Minimal 8 karakter"
                @keyup.enter="handleLogin"
                class="input pl-10 pr-10"
              />
              <button
                @click="showPass = !showPass"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                <Eye v-if="!showPass" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            @click="handleLogin"
            :disabled="loading"
            class="w-full btn-primary justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            <LogIn v-else class="w-4 h-4" />
            {{ loading ? "Memproses..." : "Masuk" }}
          </button>
        </div>

        <p class="text-center text-sm text-slate-500 mt-6">
          Belum punya akun?
          <router-link
            to="/register"
            class="text-blue-600 font-semibold hover:underline"
            >Daftar gratis</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  Rocket,
  ShieldCheck,
  Smartphone,
} from "lucide-vue-next";

const router = useRouter();
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const showPass = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = "Email dan password wajib diisi";
    return;
  }
  error.value = "";
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    router.push("/");
  } catch (err) {
    error.value =
      err.response?.data?.message || "Login gagal, periksa email dan password";
  } finally {
    loading.value = false;
  }
};
</script>
