<template>
  <div class="container-page">
    <h1>Cadastro de Knight</h1>
    <h2>Dados</h2>
    <div class="container">
      <div class="container-data">
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="knightData.name">

        <label for="nickname">Apelido</label>
        <input type="text" id="nickname" v-model="knightData.nickname">

        <label for="birthday">Data de Nascimento</label>
        <input type="date" id="birthday" v-model="knightData.birthday">
      </div>

      <h2>Armas</h2>
      <div class="container-weapons">
        <div class="container-weapons-input">
          <h3>Selecione Armas</h3>
          <label v-for="weapon in availableWeapons" :key="weapon.name">
            <input
              type="checkbox"
              :value=weapon
              :disabled="isWeaponSelected(weapon)"
              v-model="tempSelectedWeapons"
            />
            {{ weapon.name }}
          </label>
          <button @click="addSelectedWeapons()">Adicionar Armas</button>
        </div>

        <div class="container-weapons-selected">
          <h3>Armas adicionadas</h3>
          <ul v-if="selectedWeapons.length > 0">
            <li v-for="( weapon, index ) in selectedWeapons" :key="index">
              <p>name: {{ weapon.name }}</p>
              <p>modificador: {{ weapon.mod }}</p>
              <p>atributo: {{ weapon.attr }}</p>
              <p>equipado: {{ weapon.equipped }}</p>
              <button @click="equipWeapon(weapon)" :disabled="weapon.equipped">Equipar</button>
              <button @click="removeWeapon(weapon)">Remover Arma</button>
            </li>
          </ul>
        </div>

      </div>


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

          <h3>Selecione um atributo principal</h3>
          <div class="container-attributes-key">
            <div class="input-radio">
              <input type="radio" id="attr-strength" value="strength" v-model="keyAttribute">
              <label for="attr-strength">Strength</label>
            </div>

            <div class="input-radio">
              <input type="radio" id="attr-dexterity" value="dexterity" v-model="keyAttribute">
              <label for="attr-dexterity">Dexterity</label>
            </div>

            <div class="input-radio">
              <input type="radio" id="attr-constitution" value="constitution" v-model="keyAttribute">
              <label for="attr-constitution">Constitution</label>
            </div>

            <div class="input-radio">
              <input type="radio" id="attr-intelligence" value="intelligence" v-model="keyAttribute">
              <label for="attr-intelligence">Intelligence</label>
            </div>

            <div class="input-radio">
              <input type="radio" id="attr-wisdom" value="wisdom" v-model="keyAttribute">
              <label for="attr-wisdom">Wisdom</label>
            </div>

            <div class="input-radio">
              <input type="radio" id="attr-charisma" value="charisma" v-model="keyAttribute">
              <label for="attr-charisma">Charisma</label>
            </div>
          </div>
        </div>

      </div>
    </div>

    <button class="submit-button" @click="handleSubmit()">Cadastrar Knight</button>
  </div>
</template>

<script setup lang=ts>
import { onMounted, reactive, ref } from 'vue';

const availableWeapons = [
  {
    "name": "sword",
    "mod": 3,
    "attr": "strength",
  },
  {
    "name": "mace",
    "mod": 2,
    "attr": "strength",
  },
  {
    "name": "staff",
    "mod": 0,
    "attr": "strength",
  },
  {
    "name": "spear",
    "mod": 4,
    "attr": "strength",
  },
]

const tempSelectedWeapons = ref([]);
const selectedWeapons = ref<object[]>([]);

const addSelectedWeapons = () => {
  for (let i = 0; i < tempSelectedWeapons.value.length; i++) {
    if (!isWeaponSelected(tempSelectedWeapons.value[i])) {
      console.log(selectedWeapons.value)
      if (selectedWeapons.value.length === 0) {
        selectedWeapons.value.push({
          ...tempSelectedWeapons.value[i],
          equipped: true
        });
      }
      else {
        selectedWeapons.value.push({
          ...tempSelectedWeapons.value[i],
          equipped: false
        });
      }
    }
  }
  console.log(selectedWeapons.value)
  tempSelectedWeapons.value = [];
}

const equipWeapon = (weapon) => {
  const equippedWeapon = selectedWeapons.value.find(item => item.equipped === true );
  equippedWeapon.equipped = false;
  weapon.equipped = true;

}

const removeWeapon = (weapon) => {
  selectedWeapons.value = selectedWeapons.value.filter(item => item.name === weapon.name);
}

const isWeaponSelected = (weapon) => {
  return selectedWeapons.value.some(item => item.name === weapon.name);

}

const knightData = reactive({
  name: '',
  nickname: '',
  birthday: ''
});


const attributes = reactive({
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0
})

const keyAttribute = ref()

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

const handleSubmit = async () => {
  const url = "http://localhost:3000/knights"
  const knightPostData = {
    ...knightData,
    attributes,
    weapons: selectedWeapons.value,
    keyAttribute: keyAttribute.value
  }
  console.log(knightPostData)

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(knightPostData),
      headers: {
        "Content-Type": 'application/json'
      }
    })

    console.log('POST successful');
    console.log('POST response: ', response);
  } catch(error) {
    console.log('POST error: ',error);
  }
}
</script>

<style scoped>
.container-page {
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.container-data {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.container-weapons {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: left;
  margin-bottom: 20px;
}

.container-weapons-input {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 20px;
  border-radius: 10px;
}

.container-weapons-selected {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 20px;
  border-radius: 10px;

}

.container-attributes {
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 20px;
  margin-bottom: 20px;
}

.container-attributes-inputs {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
}

.container-attributes-roll {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
  gap: 10px;
}

.container-attributes-key {
  display: flex;
  flex-direction: column;

}

.submit-button {
  background-color: rgb(58, 217, 58);
  color: rgb(21, 21, 21);
  align-self: center;
  font-size: 20px;
  transition: all .1s ease-in-out;
  padding: 20px;
}

.submit-button:hover {
  background-color: rgb(27, 161, 27);
  color: rgb(205, 205, 205);
}
</style>
