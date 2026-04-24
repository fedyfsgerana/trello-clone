import { ref } from 'vue'

const toastRef = ref(null)

export const useToast = () => {
    const success = (title, message) => toastRef.value?.add('success', title, message)
    const error = (title, message) => toastRef.value?.add('error', title, message)
    const warning = (title, message) => toastRef.value?.add('warning', title, message)
    const info = (title, message) => toastRef.value?.add('info', title, message)
    return { success, error, warning, info, toastRef }
}