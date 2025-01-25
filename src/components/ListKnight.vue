<template>
  <div class="container">
    <h1>Lista de Knights</h1>
    <div class="container-knights-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Armas</th>
            <th>Atributo</th>
            <th>Ataque</th>
            <th>Exp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="knight in knights" :key="knight._id">
            <td>{{ knight.name }}</td>
            <td>{{ knight.age }}</td>
            <td>{{ knight.weapons.length }}</td>
            <td>{{ knight.keyAttribute }}</td>
            <td>{{ knight.attack }}</td>
            <td>{{ knight.experience }}</td>
            <td><button @click="handleRemoveKnight(knight._id)" class="remove-button">Remover Knight</button></td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { FetchedKnight } from '@/interfaces/fetched-knight.interface';
import { onMounted, ref, type Ref } from 'vue';

  const url = 'http://localhost:3000/knights/'

  const knights: Ref<FetchedKnight[]> = ref([]);
  const handleFetchKnightsList = async () => {
    try {
      const response = await fetch(url);
      const data: FetchedKnight[] = await response.json();
      knights.value = data;
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  const handleRemoveKnight = async (_id: string) => {
    try {
      const response = await fetch(url + _id, {
        method: 'Delete'
      });
      const data = await response.json();
      console.log('deleted knight: ', data)
      handleFetchKnightsList();
    } catch(error) {
      console.log('Error: ', error);
    }
  }

  onMounted(() => {
    handleFetchKnightsList();
  })
</script>

<style scoped>
.remove-button {
  background-color: rgb(129, 17, 17);
  color: rgb(255, 255, 255);
}
.remove-button:hover {
  background-color: rgb(232, 65, 65);
  color: rgb(35, 35, 35);

}
</style>
