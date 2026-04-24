import { ref } from 'vue'

const confirmRef = ref(null)

export const useConfirm = () => {
    const ask = (opts) => confirmRef.value?.open(opts)
    return { ask, confirmRef }
}