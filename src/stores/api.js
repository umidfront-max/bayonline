import axios from 'axios'
import { notification } from 'ant-design-vue'
import { _token } from './profile'
// _profil ni profile.js dan import qilish o'rniga
// to'g'ridan-to'g'ri localStorage dan o'qiymiz
const instance = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/`
})

export const api = ({ url, open = false, ...props }) => {
   const token = localStorage.getItem('access_token')
   const authHeader = token ? `Bearer ${token}` : null

   if (!open) {
      props.headers = {
         ...props.headers,
         Authorization:
            props.headers?.Authorization
               ? props.headers.Authorization
               : authHeader
      }
   }

   if ('pk' in props && props.pk) {
      url = `${url}/${props.pk}`
   }

   return instance({ url, ...props })
}

function createAxiosResponseInterceptor() {
   const interceptor = instance.interceptors.response.use(
      (response) => response,
      (error) => {
         if (error.response?.data?.code === 134) {
            const access_token = localStorage.getItem('access_token')
            if (access_token) {
               Clear()
            }
            return Promise.reject(error)
         }

         if (error.response?.status === 400) {
            notification.error({
               message: 'Xatolik yuz berdi',
               description: error.response?.data?.message || 'Xato',
               duration: 3,
            })
            return Promise.reject(error)
         }

         if (error.response?.status === 401) {
            notification.error({
               message: 'Xatolik yuz berdi',
               description: "Ruxsat yo'q",
               duration: 3,
            })
            Clear()
            return Promise.reject(error)
         }

         if (error.response?.status === 403) {
            notification.error({
               message: 'Xatolik yuz berdi',
               description: 'Taqiqlangan',
               duration: 3,
            })
            return Promise.reject(error)
         }

         if (error.response?.status === 404) {
            notification.error({
               message: 'Xatolik yuz berdi',
               description: 'Topilmadi',
               duration: 3,
            })
            return Promise.reject(error)
         }

         if (Math.floor(error.response?.status / 100) === 5) {
            notification.error({
               message: 'Xatolik yuz berdi',
               description: 'Serverda xatolik',
               duration: 3,
            })
            return Promise.reject(error)
         }

         instance.interceptors.response.eject(interceptor)
         return refreshAccessToken(error)
      }
   )
}

function refreshAccessToken(error) {
   const refresh_token = localStorage.getItem('refresh_token')

   if (refresh_token) {
      return axios({
         url: `${import.meta.env.VITE_BASE_URL}/api/v1/merchant/auth/refresh`,
         method: 'POST',
         data: {
            refreshToken: refresh_token,
         },
      })
         .then(({ data }) => {
            localStorage.setItem('access_token', data?.accessToken || data?.token)
            if (data?.refreshToken) {
               localStorage.setItem('refresh_token', data.refreshToken)
            }
            return instance({
               ...error.config,
               headers: {
                  ...error.config.headers,
                  Authorization: `Bearer ${data?.accessToken || data?.token}`,
               },
            })
         })
         .catch((error2) => {
            console.error('Refresh token error:', error2)
            Clear()
            return Promise.reject(error2)
         })
         .finally(createAxiosResponseInterceptor)
   }

   return Promise.reject(error)
}

function Clear() {
   localStorage.removeItem('access_token')
   localStorage.removeItem('refresh_token')
   window.location.href = '/'
}

createAxiosResponseInterceptor()