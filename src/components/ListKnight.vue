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
            <th>Apelido</th>
            <th>Idade</th>
            <th>Armas</th>
            <th>Atributo</th>
            <th>Ataque</th>
            <th>Exp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="knight in knights" :key="knight._id" class="tr-body">
            <td>{{ knight.name }}</td>
            <td v-if="!knight.edit">{{ knight.nickname }}</td>
            <td v-else><input :value="newKnightNickname" :placeholder="knight.nickname" /></td>
            <td>{{ knight.age }}</td>
            <td>{{ knight.weapons.length }}</td>
            <td>{{ knight.keyAttribute }}</td>
            <td>{{ knight.attack }}</td>
            <td>{{ knight.experience }}</td>
            <td v-if="knight.edit === false && showKnightsList" class="td-button"><button @click="knight.edit = !knight.edit" class="edit-button"><v-icon name="bi-pencil-fill" /></button></td>
            <td v-if="knight.edit === true" class="td-button"><button @click="knight.edit = !knight.edit" class="cancel-button"><v-icon name="gi-cancel" /></button></td>
            <td v-if="knight.edit === true" class="td-button"><button @click="handleUpdateNickname(knight)" class="update-button"><v-icon name="fa-save" /></button></td>
            <td v-if="showKnightsList" class="td-button"><button @click="handleRemoveKnight(knight._id)" class="remove-button"><v-icon name="bi-trash" fill="red"/></button></td>
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
      addEditToKnightsList()
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  const handleFetchHeroesList = async () => {
    try {
      const response = await fetch(url + '?filter=heroes');
      const data: FetchedKnight[] = await response.json();
      knights.value = data;
      addEditToKnightsList()
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  const addEditToKnightsList = () => {
    knights.value = knights.value.map((keys) => {
      return {
      ...keys,
      edit: false
      }
    });
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

  const newKnightNickname = ref('');

  const handleUpdateNickname = async (knight) => {
    try {
      const response = await fetch(url + `/${knight._id}`, {
        method: 'UPDATE',
        body: JSON.stringify({
          nickname: knight.nickname
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update nickname: ${response.statusText}`)
      }
      else {
        knight.edit = false;
        handleFetchKnightsList();
      }

    } catch(error) {
      console.log('error: ', error);
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

input {
  max-width: 100px;
  border: none;
  padding: 10px;
}

.td-button {
  border: none;
  padding: 0;
  width: auto;
}

button {
  padding: 10px;
}

.update-button {
  background-color: rgb(32, 220, 51);
  color: rgb(255, 255, 255);
}

.cancel-button {
  background-color: rgb(234, 11, 11);
  color: rgb(255, 255, 255);

}

.remove-button {
  background-color: rgb(241, 241, 241);
  color: red;
}

.remove-button:hover {
  background-color: rgb(232, 65, 65);
}


.tr-body:hover {
  background-color: gray;
}
</style>
