import type { AuthStoreState } from "@/interfaces/authStoreState.interface";
import type { FetchResponse } from "@/interfaces/fetchResponse.interface";
import axios from "axios";
import { defineStore } from "pinia"



export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    token: null,
    user: null,
    tokenLabel: 'knights-backend-token'
  }),

  actions: {
    async initializeStore() {
      console.log('%cinitializeStore', 'background-color: green;');
      this.token = localStorage.getItem('knights-backend-token')
      this.setTokenAtHeaders();
      console.log('this.token: ', this.token)
    },

    async checkInitialization() {
      console.log('%ccheckInitialization', 'background-color: yellow;');
      if (!this.token) {
        console.log('%cif', 'background-color: cyan;')
        await this.initializeStore();
      }
    },

    async setTokenAtHeaders() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    },

    async login(username: string, password: string): Promise<FetchResponse> {
      const url = 'http://localhost:3000/auth/login'

      try {
        const response = await axios.post(url, {username, password})
        console.log('response: ', response)
        const accessToken: string = response.data.access_token;
        localStorage.setItem(this.tokenLabel, accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return { success: true };
      }
      catch(error) {
        console.log(error)
        return { success: false, message: 'Credenciais inválidas' }
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(this.tokenLabel);
      delete axios.defaults.headers.common['Authorization'];
    },

    isAuthenticated() {
      return !!this.token;
    }

  }
});
