import { defineStore } from 'pinia';
import { api } from './api.js';
import { notification } from 'ant-design-vue';
import { _token } from './profile.js';
const useAuth = defineStore('auth', {
   state: () => ({
      user: null,
      loadingLogin: false,
      isRegistered: true,
      phoneNumber: null,
      token: localStorage.getItem('access_token') || null,
      otp: {
         otpKey: null,
         retryTimeMin: 0,
         expireOtpMin: 0,
      },
   }),
   actions: {
      clearOtp() {
         this.otp.expireOtpMin = null;
         this.otp.retryTimeMin = null;
         this.otp.otpKey = null;
         this.isRegistered = true;
      },

      async getLogin(data) {
         this.loadingLogin = true;
         try {
            const { data: response } = await api({
               url: '/api/v1/auth/token',
               method: 'POST',
               data,
            });

            console.log('Login response:', response);

            if (response.token || response.accessToken) {
               _token.value = response.access_token || response.accessToken;

               notification.success({
                  message: 'Muvaffaqiyatli',
                  description: 'Tizimga muvaffaqiyatli kirdingiz',
                  duration: 3,
               });
            }
            return response;
         } catch (error) {
            console.error('Login error:', error);
            notification.error({
               message: 'Xatolik',
               description: error?.response?.data?.message || "Login yoki parol noto'g'ri",
               duration: 3,
            });
            throw error;
         } finally {
            this.loadingLogin = false;
         }
      },

      logout() {
         this.token = null;
         this.user = null;
         localStorage.removeItem('access_token');
         localStorage.removeItem('refresh_token');
      },
   },
});

export default useAuth;