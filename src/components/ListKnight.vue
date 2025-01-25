<template>
  <div class="container">
    <h1>Lista de
      <span v-if="showKnightsList">Knights</span>
      <span v-else>Heróis</span>
    </h1>
    <div class="container-knights-list">
      <div class="container-knights-hero-toggles">
        <button @click="handleToggleKnightHeroList()">
          <span v-if="showKnightsList">Mostrar Heróis</span>
          <span v-else>Mostrar Knights</span>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Armas</th>
            <th>Atributo</th>
            <th v-if="showKnightsList">Ataque</th>
            <th v-if="showKnightsList">Exp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="knight in knights" :key="knight._id" class="tr-body">
            <td>{{ knight.name }}</td>
            <td>{{ knight.age }}</td>
            <td>{{ knight.weapons.length }}</td>
            <td>{{ knight.keyAttribute }}</td>
            <td v-if="showKnightsList">{{ knight.attack }}</td>
            <td v-if="showKnightsList">{{ knight.experience }}</td>
            <td v-if="showKnightsList"><button @click="handleRemoveKnight(knight._id)" class="remove-button">Remover Knight</button></td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { FetchedKnight } from '@/interfaces/fetched-knight.interface';
import { onMounted, ref, type Ref } from 'vue';

  const url = 'http://localhost:3000/knights'
  const showKnightsList = ref(true);

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

  const handleFetchHeroesList = async () => {
    try {
      const response = await fetch(url + '?filter=heroes');
      const data: FetchedKnight[] = await response.json();
      knights.value = data;
    } catch(error) {
      console.log('Error: ', error)
    }

  }

  const handleRemoveKnight = async (_id: string) => {
    try {
      const response = await fetch(url + `/${_id}`, {
        method: 'Delete'
      });
      const data = await response.json();
      console.log('deleted knight: ', data)
      handleFetchKnightsList();
    } catch(error) {
      console.log('Error: ', error);
    }
  }

  const handleToggleKnightHeroList = async () => {
    showKnightsList.value = !showKnightsList.value;
    if (showKnightsList.value) {
      handleFetchKnightsList()
    }
    else {
      handleFetchHeroesList()
    }

  }

  onMounted(() => {
    handleFetchKnightsList();
  })
</script>

<style scoped>

.container-knights-hero-toggles {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;


}
.remove-button {
  background-color: rgb(129, 17, 17);
  color: rgb(255, 255, 255);
  min-width: 150px;
}
.remove-button:hover {
  background-color: rgb(232, 65, 65);
  color: rgb(35, 35, 35);

}

.tr-body:hover {
  background-color: gray;
}
</style>
