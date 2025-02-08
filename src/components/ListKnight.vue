<template>
  <div class="container">
    <ShowResponseStatus :responseStatus="responseStatus" :message="responseMessage" :isVisible="isModalVisible" @hide="resetResponse" />
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
            <td v-else><input v-model="newKnightNickname" :placeholder="knight.nickname" /></td>
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
import ShowResponseStatus from './ShowResponseStatus.vue';

  const url: string = import.meta.env.VITE_API_URL + import.meta.env.VITE_KNIGHTS_ROUTE;
  const showKnightsList = ref(true);

  const knights: Ref<FetchedKnight[]> = ref([]);

  const responseStatus = ref<number|null>(null);
  const responseMessage = ref<string>('');
  const isModalVisible = ref<boolean>(false);

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

      responseStatus.value = response.status
      responseMessage.value = response.statusText
      isModalVisible.value = true;

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

  const handleUpdateNickname = async (knight: FetchedKnight) => {
    try {
      const response = await fetch(url + `/${knight._id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nickname: newKnightNickname.value
        })
      });

      responseStatus.value = response.status
      responseMessage.value = response.statusText
      isModalVisible.value = true;

      if (!response.ok) {
        throw new Error(`Failed to update nickname: ${response.statusText}`)
      }
      else {
        knight.edit = false;
        newKnightNickname.value = '';
        handleFetchKnightsList();
      }

    } catch(error) {
      console.log('error: ', error);
    }
  }

  const resetResponse = () => {
    setTimeout(() => {
      responseMessage.value = '';
      responseStatus.value = null;
      isModalVisible.value = false;
    }, 1000)
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
