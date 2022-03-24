<template>
  <h1>Recipes</h1>

  <div class="d-flex align-items-start">
    <div class="nav flex-column nav-pills me-3 my-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button v-for="(recipe, index) in recipes" :key="recipe.id"
              class="nav-link" :class="{active: index === 0}" :id="'v-pills-'+recipe.id+'-tab'" data-bs-toggle="pill"
              :data-bs-target="'#v-pills-'+recipe.id"
              type="button" role="tab" :aria-controls="'v-pills-'+recipe.id" aria-selected="true">
        {{ recipe.name }}
      </button>
    </div>
    <div class="tab-content" id="v-pills-tabContent">
      <div v-for="(recipe, index) in recipes" :key="recipe.id"
           class="tab-pane fade show " :class="{active: index === 0}" :id="'v-pills-'+recipe.id" role="tabpanel"
           :aria-labelledby="'v-pills-'+recipe.id+'-tab'">

        <RecipeIngredients :obj_id="recipe.id" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeIngredients from "@/components/RecipeIngredients";

export default {
  name: "recipes-comp",
  components: {
    RecipeIngredients
  },
  data() {
    return {
      recipes: [],
    }
  },
  methods: {
    getRecipes() {
      try {
        fetch('http://127.0.0.1:8000/recipes/recipes/')
            .then(response => response.json())
            .then(data => this.recipes = data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getRecipes();
  }
}
</script>

<style scoped>

</style>