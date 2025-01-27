<template>
  <Transition>
    <div v-show="showMessage" class="container">
      <p>{{ message }}</p>
      <p>status: {{ responseStatus }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  responseStatus: {
    type: null,
    required: false,
    default: null
  },
  message: String,
  isVisible: Boolean,
})

const emit = defineEmits(['hide']);

const showMessage = ref(false);

const showMessageTimeout = () => {
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
    emit('hide');
  }, 3000);
}

watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    showMessageTimeout();
  }
});
</script>

<style scoped>
.container {
  position: absolute;
  right: 40%;
  top: 10%;
  width: max-content;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: rgb(24, 52, 24);
  color: white;
}

p {
  font-size: 18px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
