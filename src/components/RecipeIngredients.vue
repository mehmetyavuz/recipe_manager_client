<template>
  <table class="table">
    <thead>
    <tr>
      <th>Ingredient</th>
      <th>Unit Cost</th>
      <th>Amount</th>
      <th>Cost</th>
      <th>Remove</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(i, index) in recipe_ingredients" :key="index">
      <td>{{ i.ingredient.name }}</td>
      <td>
        {{ i.ingredient.amount }} {{ i.ingredient.unit.name }} = € {{ i.ingredient.cost }}
      </td>
      <td>
        <input type="number" v-model="i.amount" @change="totalCost">
      </td>
      <td>€ {{ this.subTotal(index) }}</td>
      <td>
        <button class="btn btn-sm btn-outline-danger" @click="remove(index)">REMOVE</button>
      </td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <th colspan="3" class="text-end">Total:</th>
      <th>€ {{ totalCost() }}</th>
      <th></th>
    </tr>
    </tfoot>
  </table>

  <button type="button" class="btn btn-outline-success mx-1" data-bs-toggle="modal"
          data-bs-target="#modal-add-ri">
    Add Ingredient
  </button>
  <button class="btn btn-outline-success mx-1" @click="saveRecipe">Save Recipe</button>
</template>

<script>
export default {
  name: "recipe-ingredients",
  components: {
    // ModalAddRecipeIngredient
  },
  props: ['recipe'],
  data() {
    return {
      recipe_ingredients: [],
      new_ingredient: {},
      new_amount: 0
    }
  },
  methods: {
    getData() {
      try {
        fetch('http://127.0.0.1:8000/recipes/' + this.recipe.id)
            .then(response => response.json())
            .then(data => {
              this.recipe_ingredients = data
              this.totalCost()
            });
      } catch (error) {
        console.log(error);
      }
    },
    saveRecipe() {
      try {
        fetch(`http://127.0.0.1:8000/recipes/update/${this.recipe.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.recipe_ingredients),
        })
            .then(response => response.json())
            .then(data => {
              this.recipe_ingredients = data
              alert(`recipe updated!`)
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
      } catch (error) {
        console.log(error);
      }
    },
    remove(index) {
      this.recipe_ingredients.splice(index, 1)
    },
    subTotal(index) {
      if (this.recipe_ingredients.length > 0)
        return this.recipe_ingredients[index].amount * this.recipe_ingredients[index].ingredient.cost
      else
        return 0
    },
    totalCost() {
      let sum = 0
      this.recipe_ingredients.forEach(ri => {
        sum += ri.ingredient.cost * ri.amount
      })
      return sum
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
</style>