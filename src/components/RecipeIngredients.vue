<template>
  <table class="table">
    <thead>
    <tr>
      <th>Ingredient</th>
      <th>Unit Cost</th>
      <th>Amount</th>
      <th>Cost</th>
      <th v-if="on_edit"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(i, index) in recipe_ingredients" :key="index">
      <td>{{ i.ingredient.name }}</td>
      <td>
        {{ i.ingredient.amount }} {{ i.ingredient.unit.name }}  € {{ i.ingredient.cost }}
      </td>
      <td class="w-25">
        <label v-if="!on_edit">{{ i.amount }}</label>
        <input class="form-control w-50" v-if="on_edit" type="number" v-model="i.amount" @change="totalCost">
      </td>
      <td>€ {{ this.subTotal(index) }}</td>
      <td v-if="on_edit">
        <button class="btn btn-sm btn-outline-danger" @click="remove(index)">REMOVE</button>
      </td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <th colspan="3" class="text-end">Total:</th>
      <th>€ {{ totalCost() }}</th>
      <th v-if="on_edit"></th>
    </tr>
    </tfoot>
  </table>


  <button v-if="on_edit" type="button" class="btn btn-outline-success mx-1" data-bs-toggle="modal"
          data-bs-target="#modal-add-ri">
    Add Ingredient
  </button>
  <button v-if="!on_edit" class="btn btn-outline-success mx-1" @click="editRecipe">Edit Recipe</button>
  <button v-if="on_edit" class="btn btn-outline-primary mx-1 float-end" @click="saveRecipe">Save Recipe</button>
  <button v-if="on_edit" class="btn btn-outline-danger mx-1 float-end" @click="cancelEdit">Cancel</button>
</template>

<script>
export default {
  name: "recipe-ingredients",
  components: {},
  props: ['recipe'],
  data() {
    return {
      recipe_ingredients: [],
      new_ingredient: {},
      new_amount: 0,
      on_edit: false
    }
  },
  methods: {
    addIngredient(ingredient) {
      this.recipe_ingredients.push(ingredient)
    },
    getData() {
      try {
        fetch(`${this.$rootUrl}/recipes/${this.recipe.id}`)
            .then(response => response.json())
            .then(data => {
              this.recipe_ingredients = data
              this.totalCost()
            });
      } catch (error) {
        console.log(error);
      }
    },
    cancelEdit() {
      this.on_edit = false
      this.getData()
    },
    editRecipe() {
      this.on_edit = true
    },
    saveRecipe() {
      try {
        fetch(`${this.$rootUrl}/recipes/update/${this.recipe.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.recipe_ingredients),
        })
            .then(response => response.json())
            .then(data => {
              this.recipe_ingredients = data
              this.on_edit = false
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