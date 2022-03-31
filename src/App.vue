<template>
  <div class="container my-5">
    <div class="d-flex align-items-start">
      <div class="nav flex-column nav-pills me-3" id="v-tab" role="tablist" aria-orientation="vertical">
        <button class="btn btn-outline-primary my-1 active" id="v-ingredient-tab" data-bs-toggle="pill" data-bs-target="#v-ingredient"
                type="button" role="tab" aria-controls="v-ingredient" aria-selected="true">Ingredients
        </button>
        <button class="btn btn-outline-primary my-1" id="v-recipe-tab" data-bs-toggle="pill" data-bs-target="#v-recipe"
                type="button" role="tab" aria-controls="v-recipe" aria-selected="false">Recipes
        </button>
      </div>
      <div class="tab-content w-100" id="v-tabContent">
        <div class="tab-pane fade show active" id="v-ingredient" role="tabpanel" aria-labelledby="v-ingredient-tab">
          <Ingredients @update-ingredients='updateIngredients'/>
        </div>
        <div class="tab-pane fade" id="v-recipe" role="tabpanel" aria-labelledby="v-profile-tab">
          <Recipes ref="recipes" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ingredients from '@/components/Ingredients'
import Recipes from '@/components/Recipes'

export default {
  name: 'App',
  components: {
    Ingredients, Recipes
  },
  methods: {
    updateIngredients(ingredients) {
      this.$refs.recipes.updateIngredients(ingredients)
    }
  }
}
</script>

<style>
</style>