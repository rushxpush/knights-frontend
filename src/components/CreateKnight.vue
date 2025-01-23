<template>
  <div>
    <h1>Criador de Knight</h1>
    <div class="container">
      <label for="name">Nome</label>
      <input type="text" id="name" v-model="knightData.name">

      <label for="nickname">Apelido</label>
      <input type="text" id="nickname" v-model="knightData.nickname">

      <label for="birthday">Data de Nascimento</label>
      <input type="date" id="birthday" v-model="knightData.birthday">

      <label for="weapons">Armas</label>
      <select v-model="selectedWeapons" name="weapons" id="weapons" multiple>
        <option value="sword">Espada</option>
        <option value="mace">Maça</option>
        <option value="Staff">Bastão</option>
      </select>

      <h2>Atributos</h2>

      <div class="container-attributes">
        <div class="container-attributes-inputs">
          <label for="strength">Strength</label>
          <input type="text" id="strength" v-model="attributes.strength">

          <label for="dexterity">Dexterity</label>
          <input type="text" id="dexterity" v-model="attributes.dexterity">

          <label for="constitution">Constitution</label>
          <input type="text" id="constitution" v-model="attributes.constitution">

          <label for="intelligence">Intelligence</label>
          <input type="text" id="intelligence" v-model="attributes.intelligence">

          <label for="wisdom">Wisdom</label>
          <input type="text" id="wisdom" v-model="attributes.wisdom">

          <label for="charisma">Charisma</label>
          <input type="text" id="charisma" v-model="attributes.charisma">
        </div>
        <div class="container-attributes-roll">
          <h3>Roll</h3>
          <p>Clique para gerar atributos aleatoriamente</p>
          <button @click="reRollAttributes()">Jogar dados</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang=ts>
import { reactive, ref } from 'vue';

const knightData = reactive({
  name: '',
  nickname: '',
  birthday: ''
});

const selectedWeapons = ref<string[]>([]);

const attributes = reactive({
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0
})

const reRollAttributes = () => {
  const sides = 6;
  const numberOfDice = 3;
  for (const key in attributes) {
    attributes[key] = throwDice(sides, numberOfDice);
  }
}

const throwDice = (sides: number, numberOfDice: number) => {
  let diceSum = 0;
  for (let i = 0; i < numberOfDice; i++) {
    diceSum += getRandomArbitraryNumber(1, sides+1);
  }
  return diceSum;
}

const getRandomArbitraryNumber = (min: number, max: number)  => {
  return Math.floor(Math.random() * (max - min) + min);
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.container-attributes {
  display: flex;
  /* flex-direction: column; */
}

.container-attributes-inputs {
  display: flex;
  flex-direction: column;
}

.container-attributes-roll {
  display: flex;
  flex-direction: column;
}
</style>
