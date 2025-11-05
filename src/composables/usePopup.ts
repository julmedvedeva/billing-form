import { ref } from 'vue'

const isOpen = ref(false)
const message = ref('')
const type = ref<'success' | 'error' | null>(null)

export function usePopup() {
  const showPopup = (msg: string, msgType: 'success' | 'error') => {
    message.value = msg
    type.value = msgType
    isOpen.value = true
  }

  const closePopup = () => {
    isOpen.value = false
    message.value = ''
    type.value = null
  }

  return {
    isOpen,
    message,
    type,
    showPopup,
    closePopup,
  }
}
