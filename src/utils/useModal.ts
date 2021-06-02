import { ref } from 'vue'

const visible = ref<boolean>(false)

export function useModal() {
  return {
    visible,
    showModal: () => {
      visible.value = true
      console.log('show click', visible)
    },
    hideModal: () => {
      visible.value = false
      console.log('hide click', visible)
    }
  }
}