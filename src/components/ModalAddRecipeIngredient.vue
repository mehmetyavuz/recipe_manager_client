<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true"
       id="modal-add-ri" aria-labelledby="modal-lbl-add-ri">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-lbl-add-ri">Add Ingredient</h5>
          <button id="btn-modal-close" type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <div class="mb-3 row">
            <label for="ingredient" class="col-sm-3 col-form-label">Ingredient</label>
            <div class="col-sm-9">
              <select v-model="ingredient" id="ingredient" class="form-select">
                <option v-for="(u, i) in ingredients" :key="i" :value="u">{{ u.name }}</option>
              </select>
            </div>
          </div>
          <div v-if="Object.keys(ingredient).length > 0">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">Cost</label>
              <label class="col-sm-9 col-form-label">
                {{ ingredient.amount }} {{ getUnit(ingredient.unit).name }} € {{ ingredient.cost }}
              </label>
            </div>
            <div class="mb-3 row">
              <label for="amount" class="col-sm-3 col-form-label">Amount</label>
              <div class="col-sm-9">
                <input type="number" id="amount" v-model="amount" class="form-control">
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">Total Cost</label>
              <label class="col-sm-9 col-form-label">€ {{ total_cost() }}</label>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button v-if="Object.keys(ingredient).length > 0" type="button" class="btn btn-primary" @click="add">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalAddRecipeIngredient",
  props: ['recipe'],
  data() {
    return {
      ingredients: [],
      ingredient: {},
      amount: 0,
      cost: 0,
    }
  },
  methods: {
    getIngredients() {
      try {
        fetch(`${this.$rootUrl}/ingredients/`)
            .then(response => response.json())
            .then(data => this.ingredients = data);
      } catch (error) {
        console.log(error);
      }
    },
    getUnit(id) {
      return this.$units.find(u => u.id === id)
    },
    add() {
      if (this.ingredient.name) {
        this.ingredient.unit = this.getUnit(this.ingredient.unit)
        let ri = {
          ingredient: this.ingredient,
          amount: this.amount,
          recipe: this.recipe
        }
        this.$emit('add-recipe-ingredients', ri)
        this.ingredient = {}
        this.amount = 0
        this.cost = 0
        document.getElementById('btn-modal-close').click()
      }
    },
    total_cost() {
      return this.ingredient.cost * this.amount
    }
  },
  created() {
    this.getIngredients()
  }
}
</script>

<style scoped>

</style>