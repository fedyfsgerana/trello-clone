<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div class="w-full max-w-md animate-fade-in">
      <div class="text-center mb-8">
        <router-link to="/login" class="inline-flex items-center gap-2 mb-6">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
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
          <span class="font-display font-black text-slate-800 text-xl"
            >TaskBoard</span
          >
        </router-link>
        <h1 class="font-display font-black text-slate-800 text-3xl mb-1">
          Buat akun baru
        </h1>
        <p class="text-slate-500 text-sm">
          Gratis selamanya. Tidak perlu kartu kredit.
        </p>
      </div>

      <div class="card p-8">
        <div
          v-if="error"
          class="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 flex items-center gap-2 text-red-700 text-sm animate-slide-down"
        >
          <ExclamationCircleIcon class="w-4 h-4 flex-shrink-0" />
          {{ error }}
        </div>
        <div
          v-if="success"
          class="bg-green-50 border border-green-200 rounded-xl p-3 mb-5 flex items-center gap-2 text-green-700 text-sm animate-slide-down"
        >
          <CheckCircleIcon class="w-4 h-4 flex-shrink-0" />
          {{ success }}
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5"
              >Nama Lengkap</label
            >
            <div class="relative">
              <UserIcon
                class="w-4 h-4 text-slate-400 absolute left-3.5 top-3"
              />
              <input
                v-model="name"
                type="text"
                placeholder="John Doe"
                class="input pl-10"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5"
              >Alamat Email</label
            >
            <div class="relative">
              <EnvelopeIcon
                class="w-4 h-4 text-slate-400 absolute left-3.5 top-3"
              />
              <input
                v-model="email"
                type="email"
                placeholder="kamu@email.com"
                class="input pl-10"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5"
              >Password</label
            >
            <div class="relative">
              <LockClosedIcon
                class="w-4 h-4 text-slate-400 absolute left-3.5 top-3"
              />
              <input
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                placeholder="Minimal 8 karakter"
                class="input pl-10 pr-10"
              />
              <button
                @click="showPass = !showPass"
                class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <EyeIcon v-if="!showPass" class="w-5 h-5" />
                <EyeSlashIcon v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            @click="handleRegister"
            :disabled="loading"
            class="w-full btn-primary justify-center py-3 text-base mt-2 disabled:opacity-60"
          >
            <ArrowPathIcon v-if="loading" class="w-4 h-4 animate-spin" />
            <UserPlusIcon v-else class="w-4 h-4" />
            {{ loading ? "Memproses..." : "Daftar Sekarang" }}
          </button>
        </div>

        <p class="text-center text-sm text-slate-500 mt-5">
          Sudah punya akun?
          <router-link
            to="/login"
            class="text-blue-600 font-semibold hover:underline"
            >Masuk di sini</router-link
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
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserPlusIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);
const showPass = ref(false);

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    error.value = "Semua field wajib diisi";
    return;
  }
  if (password.value.length < 8) {
    error.value = "Password minimal 8 karakter";
    return;
  }
  error.value = "";
  loading.value = true;
  try {
    await authStore.register(name.value, email.value, password.value);
    success.value = "Akun berhasil dibuat! Mengalihkan ke halaman login...";
    setTimeout(() => router.push("/login"), 2000);
  } catch (err) {
    error.value = err.response?.data?.message || "Registrasi gagal, coba lagi";
  } finally {
    loading.value = false;
  }
};
</script>
