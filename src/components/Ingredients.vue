<template>
  <div class="new_ingredient">
    <form v-on:submit.prevent="submitForm">
      <div class="form-group">
        <label>Article Number: {{ article_number }}</label>
      </div>
      <div class="form-group">
        <label for="name">Title</label>
        <input type="text" class="form-control" id="name" v-model="name">
      </div>
      <div class="form-group">
        <label for="amount">Amount</label>
        <input type="number" class="form-control" id="amount" v-model="amount">
      </div>
      <div class="form-group">
        <label for="unit">Unit</label>
        <select v-model="unit" id="unit">
          <option v-for="(u, i) in units" :key="i" :value="u.name">{{ u.name }}</option>
        </select>
        <!--        <input type="text" class="form-control" id="unit" v-model="unit">-->
      </div>
      <div class="form-group">
        <label for="cost">Cost</label>
        <input type="text" class="form-control" id="cost" v-model="cost">
      </div>
      <div class="form-group">
        <button type="submit">Save Ingredient</button>
      </div>
    </form>
  </div>

  <div class="ingredients_content">
    <h1>Ingredients</h1>
    <ul class="ingredients_list">
      <li v-for="ingredient in ingredients" :key="ingredient.id">
        <h2>{{ ingredient.name }}</h2>
        <p>Article number : {{ ingredient.article_number }}</p>
        <p>amount: <input type="number" v-model="ingredient.amount"></p>
        <p>cost: <input type="number" v-model="ingredient.cost"></p>
        <p>unit: <input type="text" v-model="ingredient.unit.name"></p>
        <!--        <button @click="toggleTask(ingredient)">-->
        <!--          {{ ingredient.completed ? 'Undo' : 'Complete' }}-->
        <!--        </button>-->
        <button @click="saveIngredient(ingredient)">Save</button>
        <button @click="deleteIngredient(ingredient)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ingredients-comp",
  data() {
    return {
      units: [],
      ingredients: [],
      name: '',
      article_number: '',
      unit: '',
      amount: 0,
      cost: 0
    }
  },
  methods: {
    getUnits() {
      try {
        fetch('http://127.0.0.1:8000/ingredients/units/')
            .then(response => response.json())
            .then(data => this.units = data);
      } catch (error) {
        console.log(error);
      }
    },
    getData() {
      try {
        fetch('http://127.0.0.1:8000/ingredients/')
            .then(response => response.json())
            .then(data => this.ingredients = data);
      } catch (error) {
        console.log(error);
      }
    },
    submitForm() {
      try {
        let body = {
          name: this.name,
          article_number: this.article_number,
          unit: this.unit,
          amount: this.amount,
          cost: this.cost
        };
        fetch('http://127.0.0.1:8000/ingredients/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
              this.ingredients.push(data);
              console.log('Success:', data);
            })
            .catch(err => {
              console.log('Error:', err);
            });
        this.name = '';
        this.article_number = '';
        this.unit = '';
        this.amount = 0;
        this.cost = 0;
      } catch (error) {
        console.log(error);
      }
    },
    saveIngredient(ingredient) {
      try {
        let body = {
          name: ingredient.name,
          article_number: ingredient.article_number,
          unit: ingredient.unit,
          amount: ingredient.amount,
          cost: ingredient.cost,
        };
        fetch(`http://127.0.0.1:8000/ingredients/${ingredient.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {

              let ingredientIndex = this.ingredients.findIndex(t => t.id === ingredient.id);
              this.ingredients = this.ingredients.map((ingredient) => {
                if (this.ingredients.findIndex(t => t.id === ingredient.id) === ingredientIndex) {
                  return data;
                }
                return ingredient;
              });
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
      } catch (error) {
        console.log(error);
      }
    },
    deleteIngredient(ingredient) {
      let confirmation = confirm("Do you want to delete this ingredient?");
      if (confirmation) {
        try {
          fetch(`http://127.0.0.1:8000/ingredients/${ingredient.id}`, {
            method: 'DELETE'
          }).then(() => this.getData());
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  created() {
    this.getUnits();
    this.getData();
  }
}
</script>

<style scoped>

</style>