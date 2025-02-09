<template>
  <div class="container">
    <h1>Login</h1>

    <ShowResponseStatus :responseStatus="responseStatus" :message="responseMessage" :isVisible="isModalVisible" @hide="resetMessageLogger" />
    <label for="username">Nome do Usuário</label>
    <input v-model="username" type="text" id="username">

    <label for="password">Senha</label>
    <input v-model="password" type="password" id="password">

    <button @click="submitLogin(username, password)">Login</button>
  </div>
</template>

<script setup lang="ts">
import { StatusCodeEnum } from '@/common/enums/StatusCodeEnum';
import ShowResponseStatus from '@/components/ShowResponseStatus.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

// Setup
const authStore = useAuthStore();

// Login data
const username = ref('john');
const password = ref('johnpass');

// Logger data
const responseStatus = ref<number|null>(null);
const responseMessage = ref<string>('');
const isModalVisible = ref<boolean>(false);


// Login functions
const submitLogin = async (username: string, password: string) => {
  const response = await authStore.login(username, password);
  console.log('response: ', response)

  if (response.success) {
    setMessageLogger(StatusCodeEnum.SUCCESS, 'Login foi feito com sucess', true);
    await router.push('/');
    setTimeout(async () => {
      console.log('%csetTimeout', 'background-color: yellow;')
    }, 1000);
  }
  else {
    setMessageLogger(StatusCodeEnum.SUCCESS, response.message, true);
  }
}

// Logger functions
const setMessageLogger = (status: number | null, message: string | undefined, isVisible: boolean) => {
  responseStatus.value = status;
  responseMessage.value = message ? message : '';
  isModalVisible.value = isVisible;
}

const resetMessageLogger = () => {
  setTimeout(() => {
    responseMessage.value = '';
    responseStatus.value = null;
    isModalVisible.value = false;
  }, 1000)
}

</script>

<style scoped></style>
