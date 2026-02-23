import { useStorage } from '@vueuse/core'
export const _profil = useStorage('profile', { token: '', username: '', userId: 0, special_task: '' })
export const _token = useStorage('access_token', '')
