<template>
  <div>
    <ul>
      <li v-for="(i, index) in recipe_ingredients" :key="index">
        <div>
          {{ i.amount }} X {{ i.ingredient.name }}
          ({{ i.ingredient.amount }} {{ i.ingredient.unit.name }} = € {{ i.ingredient.cost }})
        </div>
      </li>
    </ul>
    <hr>
    <h3 class="text-end">Total: <b>€ {{ this.total_cost }}</b></h3>
  </div>
</template>

<script>
export default {
  name: "recipe-ingredients",
  props: ['obj_id'],
  data() {
    return {
      recipe_ingredients: [],
      total_cost: 0
    }
  },
  methods: {
    getData() {
      try {
        fetch('http://127.0.0.1:8000/recipes/' + this.obj_id)
            .then(response => response.json())
            .then(data => {
              this.recipe_ingredients = data
              this.totalCost()
            });
      } catch (error) {
        console.log(error);
      }
    },
    totalCost() {
      this.total_cost = this.recipe_ingredients.reduce((acc, curr) =>
          acc.amount * acc.ingredient.cost + curr.amount * curr.ingredient.cost)
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>

</style>