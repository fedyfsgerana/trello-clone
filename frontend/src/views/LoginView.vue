<template>
  <div class="min-h-screen flex">
    <!-- Left panel -->
    <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 flex-col items-center justify-center p-12 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-40 h-40 bg-white rounded-full"></div>
        <div class="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full"></div>
      </div>
      <div class="max-w-md text-center relative z-10">
        <div class="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur shadow-xl">
          <Squares2X2Icon class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-4xl font-black mb-4">TaskBoard</h1>
        <p class="text-blue-100 text-lg leading-relaxed">
          Kelola proyek tim kamu dengan mudah. Buat board, tambah task, dan pantau progres secara real-time.
        </p>
        <div class="mt-10 grid grid-cols-3 gap-4">
          <div class="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur">
            <RocketLaunchIcon class="w-7 h-7 mx-auto mb-2" />
            <div class="text-xs text-blue-100">Cepat</div>
          </div>
          <div class="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur">
            <ShieldCheckIcon class="w-7 h-7 mx-auto mb-2" />
            <div class="text-xs text-blue-100">Aman</div>
          </div>
          <div class="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur">
            <BoltIcon class="w-7 h-7 mx-auto mb-2" />
            <div class="text-xs text-blue-100">Efisien</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right panel -->
    <div class="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div class="mb-8">
            <h2 class="text-2xl font-black text-gray-800">Selamat datang! 👋</h2>
            <p class="text-gray-500 mt-1">Masuk untuk melanjutkan ke TaskBoard</p>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm flex items-center gap-2">
            <ExclamationCircleIcon class="w-4 h-4 flex-shrink-0" />
            {{ error }}
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
              <div class="relative">
                <EnvelopeIcon class="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="email@example.com"
                  @keyup.enter="handleLogin"
                  class="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
              <div class="relative">
                <LockClosedIcon class="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  @keyup.enter="handleLogin"
                  class="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <button
              @click="handleLogin"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mt-2"
            >
              <ArrowPathIcon v-if="loading" class="w-4 h-4 animate-spin" />
              <ArrowRightOnRectangleIcon v-else class="w-4 h-4" />
              {{ loading ? 'Memproses...' : 'Masuk' }}
            </button>
          </div>

          <p class="text-center text-sm text-gray-500 mt-6">
            Belum punya akun?
            <router-link to="/register" class="text-indigo-600 font-bold hover:underline">
              Daftar gratis
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import {
  Squares2X2Icon, RocketLaunchIcon, ShieldCheckIcon, BoltIcon,
  EnvelopeIcon, LockClosedIcon, ExclamationCircleIcon,
  ArrowRightOnRectangleIcon, ArrowPathIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login gagal, coba lagi'
  } finally {
    loading.value = false
  }
}
</script>